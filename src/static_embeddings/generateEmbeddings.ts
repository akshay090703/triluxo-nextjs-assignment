import dbConnect from "@/lib/dbConnect";
import { generateActivityFeedEmbeddings } from "./activityFeedEmbedding";
import { generativeActiveUserCountEmbeddings } from "./activeUserEmbedding";
import { generateUserEmbeddings } from "./userEmbedding";

const generateEmbeddings = async () => {
  await dbConnect();

  await generateActivityFeedEmbeddings();
  await generativeActiveUserCountEmbeddings();
  await generateUserEmbeddings();
  console.log("All embeddings generated and stored in Pinecone");
};

// generateEmbeddings();
