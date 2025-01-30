import mongoose, { Document, model, Schema } from "mongoose";

interface IActivityMetric extends Document {
  timestamp: Date;
  signUps: number;
  messagesSent: number;
}

const ActivityMetricSchema = new Schema<IActivityMetric>({
  timestamp: { type: Date, required: true, default: Date.now },
  signUps: { type: Number, required: true },
  messagesSent: { type: Number, required: true },
});

export default mongoose.models.ActivityMetric ||
  model<IActivityMetric>("ActivityMetric", ActivityMetricSchema);
