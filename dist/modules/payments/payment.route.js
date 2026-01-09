"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const payments_controller_1 = require("../payments/payments.controller");
const router = (0, express_1.Router)();
router.post("/create-intent", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), payments_controller_1.PaymentControllers.createPaymentIntent);
// router.get(
//   "/me",
//   checkAuth(Role.USER, Role.ADMIN),
//   paymentController.getMyPayments
// );
// ✅ EXPORT THIS
exports.paymentsRoutes = router;
