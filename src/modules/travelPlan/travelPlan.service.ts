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

const matchTravelPlans = async (query: any, decodedToken: JwtPayload) => {
  const { destination, startDate, endDate, travelType } = query;

  const filter: any = {
    destination,
    isActive: true,
    user: { $ne: decodedToken.userId }, // ❗ exclude own plans
    startDate: { $lte: new Date(endDate) },
    endDate: { $gte: new Date(startDate) },
  };

  if (travelType) {
    filter.travelType = travelType;
  }

  const matches = await TravelPlan.find(filter)
    .populate("user", "name email role image bio")
    .sort({ startDate: 1 });

  return matches;
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
