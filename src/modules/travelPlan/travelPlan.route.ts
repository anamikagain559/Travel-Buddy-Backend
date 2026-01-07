import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TravelPlanControllers } from "./travelPlan.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN),
  TravelPlanControllers.createTravelPlan
);
router.get(
  "/match",
  checkAuth(Role.USER, Role.ADMIN),
  TravelPlanControllers.matchTravelPlans
);
router.get("/", TravelPlanControllers.getAllTravelPlans);

router.get(
  "/my-plans",
  checkAuth(Role.USER, Role.ADMIN),
  TravelPlanControllers.getMyTravelPlans
);

router.get("/:id", TravelPlanControllers.getSingleTravelPlan);

router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  TravelPlanControllers.updateTravelPlan
);

router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN),
  TravelPlanControllers.deleteTravelPlan
);


export const TravelPlanRoutes = router;
