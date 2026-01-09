import { Router } from "express";
import { checkAuth } from "../../modules/middlewares/checkAuth";
import { validateRequest } from "../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { Role } from "./user.interface";

const router = Router();

/* ================= AUTH & PROFILE ================= */

// Register
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

// Logged-in user profile
router.get(
  "/me",
  checkAuth(...Object.values(Role)),
  UserControllers.getMe
);

// 🔥 MUST be before "/:id"
router.patch(
  "/update-my-profile",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  UserControllers.updateMyProfile
);

/* ================= ADMIN ROUTES ================= */

// Get all users (ADMIN only)
router.get(
  "/all-users",
  checkAuth(Role.ADMIN),
  UserControllers.getAllUsers
);

// Block / Unblock user (ADMIN only)
router.patch(
  "/block-unblock/:id",
  checkAuth(Role.ADMIN),
  UserControllers.blockOrUnblockUser
);

// Update any user by ID (ADMIN only)
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
