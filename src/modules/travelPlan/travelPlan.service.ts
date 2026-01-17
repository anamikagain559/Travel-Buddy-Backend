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
  decodedToken: JwtPayload
) => {
  const plan = await TravelPlan.findById(id);

  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, "Travel plan not found");
  }

  if (plan.user.toString() !== decodedToken.userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can delete only your own travel plan"
    );
  }

  await TravelPlan.findByIdAndDelete(id);
  return null;
};

export const matchTravelPlans = async (query: any, decoded: JwtPayload) => {
  const { destination, startDate, endDate, travelType } = query;

  const orConditions: any[] = [];

  // Match destination city/country if provided
  if (destination) {
    orConditions.push(
      { "destination.city": { $regex: destination, $options: "i" } },
      { "destination.country": { $regex: destination, $options: "i" } }
    );
  }

  // Match any overlap with date range
  if (startDate && endDate) {
    orConditions.push({
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });
  }

  // Match travel type
  if (travelType) {
    orConditions.push({
      travelType: { $regex: `^${travelType}$`, $options: "i" },
    });
  }

  // ✅ Final filter
  const filter: any = {
    isActive: true,
    user: { $ne: decoded.userId }, // exclude own plans
  };

  if (orConditions.length > 0) {
    filter.$or = orConditions;
  }

  console.log("FINAL MATCH FILTER 👉", filter);

  return TravelPlan.find(filter)
    .populate("user", "name email image bio")
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
