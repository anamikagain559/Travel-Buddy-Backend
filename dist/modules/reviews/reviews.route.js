"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const reviews_controller_1 = require("./reviews.controller");
const router = (0, express_1.Router)();
/**
 * Create a review
 * Only logged-in users
 */
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), reviews_controller_1.ReviewControllers.createReview);
/**
 * Get all reviews for a travel plan (public)
 */
router.get("/travel-plan/:travelPlanId", reviews_controller_1.ReviewControllers.getReviewsByTravelPlan);
/**
 * Update own review
 */
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), reviews_controller_1.ReviewControllers.updateReview);
/**
 * Delete own review
 */
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), reviews_controller_1.ReviewControllers.deleteReview);
// ✅ EXPORT ROUTER
exports.reviewsRoutes = router;
