import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { TravelPlan } from "./travelPlan.model";
import { ITravelPlan } from "./travelPlan.interface";

const createTravelPlan = async (
  payload: ITravelPlan,
  decodedToken: JwtPayload
) => {
  return await TravelPlan.create({
    ...payload,
    user: decodedToken.userId,
    isActive: true,
  });
};

const getAllTravelPlans = async () => {
  return await TravelPlan.find({
    $or: [{ isActive: true }, { isActive: { $exists: false } }],
  })
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

const getMyTravelPlans = async (decodedToken: JwtPayload) => {
  return await TravelPlan.find({ user: decodedToken.userId });
};

const getSingleTravelPlan = async (id: string) => {
  const plan = await TravelPlan.findById(id).populate(
    "user",
    "name email"
  );

  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, "Travel plan not found");
  }

  return plan;
};

const updateTravelPlan = async (
  id: string,
  payload: Partial<ITravelPlan>,
  decodedToken: JwtPayload
) => {
  const plan = await TravelPlan.findById(id);

  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, "Travel plan not found");
  }

  if (plan.user.toString() !== decodedToken.userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can update only your own travel plan"
    );
  }

  const updated = await TravelPlan.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );

  return updated;
};

const deleteTravelPlan = async (
  id: string,
  decodedToken: JwtPayload & { userId: string; role: string } // make sure role is included
) => {
  const plan = await TravelPlan.findById(id);

  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, "Travel plan not found");
  }

  // Admin can delete any plan
  if (decodedToken.role !== "ADMIN" && plan.user.toString() !== decodedToken.userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can delete only your own travel plan"
    );
  }

  await TravelPlan.findByIdAndDelete(id);
  return null;
};


 const matchTravelPlans = async (query: any, decoded: JwtPayload) => {
  const { destination, startDate, endDate, travelType } = query;

  const filter: any = {
    isActive: true,
    user: { $ne: decoded.userId }, // exclude own plans
  };

  const andConditions: any[] = [filter];

  // Match destination city or country
  if (destination) {
    andConditions.push({
      $or: [
        { "destination.city": { $regex: destination, $options: "i" } },
        { "destination.country": { $regex: destination, $options: "i" } },
      ],
    });
  }

  // Match date overlap
  if (startDate && endDate) {
    andConditions.push({
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });
  }

  // Match travel type
  if (travelType) {
    andConditions.push({
      travelType: travelType.toUpperCase(),
    });
  }

  console.log("FINAL MATCH FILTER 👉", { $and: andConditions });

  return TravelPlan.find({ $and: andConditions })
    .populate("user", "name email picture bio")
    .sort({ startDate: 1 });
};

export const TravelPlanServices = {
  createTravelPlan,
  getAllTravelPlans,
  getMyTravelPlans,
  getSingleTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
  matchTravelPlans,
};
