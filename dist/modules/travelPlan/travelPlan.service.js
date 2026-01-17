"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlanServices = exports.matchTravelPlans = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const travelPlan_model_1 = require("./travelPlan.model");
const createTravelPlan = async (payload, decodedToken) => {
    return await travelPlan_model_1.TravelPlan.create({
        ...payload,
        user: decodedToken.userId,
        isActive: true,
    });
};
const getAllTravelPlans = async () => {
    return await travelPlan_model_1.TravelPlan.find({
        $or: [{ isActive: true }, { isActive: { $exists: false } }],
    })
        .populate("user", "name email role")
        .sort({ createdAt: -1 });
};
const getMyTravelPlans = async (decodedToken) => {
    return await travelPlan_model_1.TravelPlan.find({ user: decodedToken.userId });
};
const getSingleTravelPlan = async (id) => {
    const plan = await travelPlan_model_1.TravelPlan.findById(id).populate("user", "name email");
    if (!plan) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Travel plan not found");
    }
    return plan;
};
const updateTravelPlan = async (id, payload, decodedToken) => {
    const plan = await travelPlan_model_1.TravelPlan.findById(id);
    if (!plan) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Travel plan not found");
    }
    if (plan.user.toString() !== decodedToken.userId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You can update only your own travel plan");
    }
    const updated = await travelPlan_model_1.TravelPlan.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return updated;
};
const deleteTravelPlan = async (id, decodedToken) => {
    const plan = await travelPlan_model_1.TravelPlan.findById(id);
    if (!plan) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Travel plan not found");
    }
    if (plan.user.toString() !== decodedToken.userId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You can delete only your own travel plan");
    }
    await travelPlan_model_1.TravelPlan.findByIdAndDelete(id);
    return null;
};
const matchTravelPlans = async (query, decoded) => {
    const { destination, startDate, endDate, travelType } = query;
    const orConditions = [];
    // Match destination city/country if provided
    if (destination) {
        orConditions.push({ "destination.city": { $regex: destination, $options: "i" } }, { "destination.country": { $regex: destination, $options: "i" } });
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
    const filter = {
        isActive: true,
        user: { $ne: decoded.userId }, // exclude own plans
    };
    if (orConditions.length > 0) {
        filter.$or = orConditions;
    }
    console.log("FINAL MATCH FILTER 👉", filter);
    return travelPlan_model_1.TravelPlan.find(filter)
        .populate("user", "name email image bio")
        .sort({ startDate: 1 });
};
exports.matchTravelPlans = matchTravelPlans;
exports.TravelPlanServices = {
    createTravelPlan,
    getAllTravelPlans,
    getMyTravelPlans,
    getSingleTravelPlan,
    updateTravelPlan,
    deleteTravelPlan,
    matchTravelPlans: exports.matchTravelPlans,
};
