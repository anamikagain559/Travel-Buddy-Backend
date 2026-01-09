"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const stripe_1 = __importDefault(require("stripe"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Ensure STRIPE_SECRET_KEY exists
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in .env");
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const decodedToken = req.user;
    const { plan } = req.body;
    let amount = 0;
    if (plan === "MONTHLY")
        amount = 10;
    if (plan === "YEARLY")
        amount = 100;
    if (amount <= 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Invalid plan selected",
            data: null,
        });
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe uses cents
        currency: "inr",
        payment_method_types: ["card"],
        metadata: {
            userId: decodedToken.userId,
            plan: plan || "DEFAULT",
        },
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Payment intent created successfully",
        data: {
            clientSecret: paymentIntent.client_secret,
        },
    });
});
exports.PaymentControllers = {
    createPaymentIntent,
};
