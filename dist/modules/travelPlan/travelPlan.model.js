"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlan = void 0;
// src/modules/travelPlan/travelPlan.model.ts
const mongoose_1 = require("mongoose");
const travelPlanSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.TravelPlan = (0, mongoose_1.model)("TravelPlan", travelPlanSchema);
