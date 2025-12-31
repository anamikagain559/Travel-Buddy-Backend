import { Types } from "mongoose";

export interface ITravelPlan {
  user: Types.ObjectId;
  destination: string;
  startDate: Date;
  endDate: Date;
  budgetRange: string;
  travelType: "SOLO" | "FAMILY" | "FRIENDS";
  description?: string;
  isActive: boolean;
}
