import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TravelPlanServices } from "./travelPlan.service";

const createTravelPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanServices.createTravelPlan(
    req.body,
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Travel plan created successfully",
    data: result,
  });
});

const getAllTravelPlans = catchAsync(async (_req, res) => {
  const result = await TravelPlanServices.getAllTravelPlans();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel plans retrieved successfully",
    data: result,
  });
});

const getMyTravelPlans = catchAsync(async (req, res) => {
  const result = await TravelPlanServices.getMyTravelPlans(
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My travel plans retrieved successfully",
    data: result,
  });
});

const getSingleTravelPlan = catchAsync(async (req, res) => {
  const result = await TravelPlanServices.getSingleTravelPlan(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel plan retrieved successfully",
    data: result,
  });
});

const updateTravelPlan = catchAsync(async (req, res) => {
  const result = await TravelPlanServices.updateTravelPlan(
    req.params.id,
    req.body,
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel plan updated successfully",
    data: result,
  });
});

const deleteTravelPlan = catchAsync(async (req, res) => {
  await TravelPlanServices.deleteTravelPlan(
    req.params.id,
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Travel plan deleted successfully",
    data: null,
  });
});
const matchTravelPlans = catchAsync(async (req, res) => {
  const result = await TravelPlanServices.matchTravelPlans(
    req.query,
    req.user as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Matching travel plans retrieved successfully",
    data: result,
  });
});
export const TravelPlanControllers = {
  createTravelPlan,
  getAllTravelPlans,
  getMyTravelPlans,
  getSingleTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
  matchTravelPlans,
};
