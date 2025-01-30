import { getEmbedding } from "@/lib/gemini";
import { appIndex } from "@/lib/pinecone";
import ActivityMetric from "@/models/ActivityMetric";

export const generateActivityFeedEmbeddings = async () => {
  const metrics = await ActivityMetric.find({});

  const embeddings = [];

  for (const metric of metrics) {
    const text = `Sign Ups: ${metric.signUps}, Messages Sent: ${metric.messagesSent}, Timestamp: ${metric.timestamp}.\n`;

    const embedding = await getEmbedding(text);

    embeddings.push({
      id: metric._id.toString(),
      values: embedding,
      metadata: {
        signUps: metric.signUps,
        messagesSent: metric.messagesSent,
        timestamp: metric.timestamp,
      },
    });
  }

  await appIndex.upsert(embeddings);
  console.log("ActivityMetric embeddings stored in Pinecone");
};
