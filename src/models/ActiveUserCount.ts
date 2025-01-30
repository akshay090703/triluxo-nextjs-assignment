import mongoose, { Document, model, Schema } from "mongoose";

interface IActiveUserCount extends Document {
  timestamp: Date;
  activeUsers: number;
}

const ActiveUserCountSchema = new Schema<IActiveUserCount>({
  timestamp: { type: Date, required: true, default: Date.now },
  activeUsers: { type: Number, required: true },
});

export default mongoose.models.ActiveUserCount ||
  model<IActiveUserCount>("ActiveUserCount", ActiveUserCountSchema);
