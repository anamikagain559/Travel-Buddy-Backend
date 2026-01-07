import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { PaymentControllers } from "../payments/payments.controller";

const router = Router();

router.post(
  "/create-intent",
  checkAuth(Role.USER, Role.ADMIN),
  PaymentControllers.createPaymentIntent
);

// router.get(
//   "/me",
//   checkAuth(Role.USER, Role.ADMIN),
//   paymentController.getMyPayments
// );

// ✅ EXPORT THIS
export const paymentsRoutes = router;
