import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;

interface ChatCompletionMessage {
  role: string;
  content: string;
}

export async function getEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: "models/embedding-001" });

  const response = await model.embedContent(text);

  const embedding = response.embedding?.values;

  if (!embedding) {
    throw new Error("Error generating embeddings.");
  }

  return embedding;
}

export async function chatWithGemini(messages: ChatCompletionMessage[]) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const generationConfig = {
      temperature: 0.1,
      topP: 0.5,
      topK: 20,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      messages.map((msg) => msg.content).join("\n")
    );

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Error generating response.");
  }
}
