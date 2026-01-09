import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"

import { reviewsRoutes } from "../modules/reviews/reviews.route"
import { TravelPlanRoutes } from "../modules/travelPlan/travelPlan.route";
import {paymentsRoutes} from "../modules/payments/payment.route";
import { OtpRoutes } from "../modules/otp/otp.route"
export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
         path: "/travel-plans",
        route: TravelPlanRoutes 
    }, {
        path: "/otp",
        route: OtpRoutes
    },

    {
        path: "/payments",
        route: paymentsRoutes
    },
        {
        path: "/reviews",
        route: reviewsRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)