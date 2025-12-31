import { Schema, model } from "mongoose";
import { ITravelPlan } from "./travelPlan.interface";

const travelPlanSchema = new Schema<ITravelPlan>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budgetRange: {
      type: String,
      required: true,
    },
    travelType: {
      type: String,
      enum: ["SOLO", "FAMILY", "FRIENDS"],
      required: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TravelPlan = model<ITravelPlan>(
  "TravelPlan",
  travelPlanSchema
);
