import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import Stripe from "stripe";
import { JwtPayload } from "jsonwebtoken";
import { Payment } from "./payments.model";
import httpStatus from "http-status-codes";

// Ensure STRIPE_SECRET_KEY exists
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const {  plan } = req.body;

let amount = 0;

  if (plan === "MONTHLY") amount = 10;
  if (plan === "YEARLY") amount = 100;

  if (amount <= 0) {
    return sendResponse(res, {
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

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment intent created successfully",
    data: {
      clientSecret: paymentIntent.client_secret,
    },
  });
});

export const PaymentControllers = {
  createPaymentIntent,
};