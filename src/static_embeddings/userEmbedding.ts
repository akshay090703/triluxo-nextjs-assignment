import { getEmbedding } from "@/lib/gemini";
import { appIndex } from "@/lib/pinecone";
import User from "@/models/User";

export const generateUserEmbeddings = async () => {
  const users = await User.find({});

  const embeddings = [];

  for (const user of users) {
    const text = `Email: ${user.email}, Full Name: ${user.fullName}, Created At: ${user.createdAt}`;

    const embedding = await getEmbedding(text);

    embeddings.push({
      id: user._id.toString(),
      values: embedding,
      metadata: {
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
      },
    });

    await appIndex.upsert(embeddings);
    console.log("User embeddings stored in Pinecone");
  }
};
