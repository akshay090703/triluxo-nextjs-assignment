import { getEmbedding } from "@/lib/gemini";
import { appIndex } from "@/lib/pinecone";
import ActiveUserCount from "@/models/ActiveUserCount";

export const generativeActiveUserCountEmbeddings = async () => {
  const userCounts = await ActiveUserCount.find({});

  const embeddings = [];

  for (const userCount of userCounts) {
    const text = `Active Users: ${userCount.activeUsers}, Timestamp: ${userCount.timestamp}.\n`;

    const embedding = await getEmbedding(text);

    embeddings.push({
      id: userCount._id.toString(),
      values: embedding,
      metadata: {
        activeUsers: userCount.activeUsers,
        timestamp: userCount.timestamp,
      },
    });
  }

  await appIndex.upsert(embeddings);
  console.log("ActiveUserCount embeddings stored in Pinecone");
};
