// src/modules/travelPlan/travelPlan.model.ts
import { Schema, model } from "mongoose";

const travelPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      country: { type: String, required: true },
      city: { type: String, required: true },
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
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    travelType: {
      type: String,
      enum: ["SOLO", "FAMILY", "FRIENDS"],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String, // ✅ new field
      maxlength: 500,
    },
  },
  { timestamps: true }
);

export const TravelPlan = model("TravelPlan", travelPlanSchema);
