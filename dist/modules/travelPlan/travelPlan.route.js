"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPlanRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const travelPlan_controller_1 = require("./travelPlan.controller");
const router = (0, express_1.Router)();
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), travelPlan_controller_1.TravelPlanControllers.createTravelPlan);
router.get("/match", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), travelPlan_controller_1.TravelPlanControllers.matchTravelPlans);
router.get("/", travelPlan_controller_1.TravelPlanControllers.getAllTravelPlans);
router.get("/my-plans", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), travelPlan_controller_1.TravelPlanControllers.getMyTravelPlans);
router.get("/public", travelPlan_controller_1.TravelPlanControllers.getPublicTravelPlans); // <-- conflict
router.get("/:id", travelPlan_controller_1.TravelPlanControllers.getSingleTravelPlan);
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), travelPlan_controller_1.TravelPlanControllers.updateTravelPlan);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), travelPlan_controller_1.TravelPlanControllers.deleteTravelPlan);
exports.TravelPlanRoutes = router;
