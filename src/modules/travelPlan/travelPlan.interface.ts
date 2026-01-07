export type TravelType = "SOLO" | "FAMILY" | "FRIENDS";

export interface ITravelPlan {
  destination: {
    country: string;
    city: string;
  };
  startDate: Date;
  endDate: Date;
  budgetRange: {
    min: number;
    max: number;
  };
  travelType: TravelType;
  description?: string;
  isPublic?: boolean;
  user?: string;
}
