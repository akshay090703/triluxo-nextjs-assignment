import dbConnect from "@/lib/dbConnect";
import genAI, { chatWithGemini, getEmbedding } from "@/lib/gemini";
import { appIndex } from "@/lib/pinecone";
import ActiveUserCount from "@/models/ActiveUserCount";
import ActivityMetric from "@/models/ActivityMetric";
import User from "@/models/User";
import { Message } from "ai/react";

interface ChatCompletionMessage {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  dbConnect();

  try {
    const body = await req.json();
    const message: ChatCompletionMessage = body.newMessage;

    const embedding = await getEmbedding(message.content);

    const vectorQueryResponse = await appIndex.query({
      vector: embedding,
      topK: 4,
    });

    const vectorIds = vectorQueryResponse.matches.map((match) => match.id);

    const relevantUsers = await User.find({ _id: { $in: vectorIds } });
    const relevantActiveUsers = await ActiveUserCount.find({
      _id: { $in: vectorIds },
    });
    const relevantActivityMetrics = await ActivityMetric.find({
      _id: { $in: vectorIds },
    });

    const relevantData = [
      ...relevantUsers.map(
        (user) =>
          `User: ${user.fullName}, Email: ${user.email}, Created At: ${user.createdAt}`
      ),
      ...relevantActiveUsers.map(
        (userCount) =>
          `Active Users: ${userCount.activeUsers}, Timestamp: ${userCount.timestamp}`
      ),
      ...relevantActivityMetrics.map(
        (metric) =>
          `Sign Ups: ${metric.signUps}, Messages Sent: ${metric.messagesSent}, Timestamp: ${metric.timestamp}`
      ),
    ].join("\n");

    const systemMessage: ChatCompletionMessage = {
      role: "user",
      content: `You are an intelligent LLM bot called Triluxo. You answer the user's question based on the existing data on the website. The relevant information for this query are: \n${relevantData}\n\n
      User Question: ${message.content}\n
      If possible then answer based on the user's question and the relevant information. If the question is not from this information then answer the question without any context and based on your own trained data knowledge. Answer in plain 1-2 lines of string. Dont give answer like you dont have any relevant information and try your best to get an answer. Keep a friendly tone as well.
      `,
    };

    const combinedMessages = [systemMessage];

    const data = await chatWithGemini(combinedMessages);

    return Response.json({
      role: "assistant",
      content: data,
      id: crypto.randomUUID(),
    } as Message);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
