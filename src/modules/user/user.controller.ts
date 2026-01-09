
import { Request, Response  } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { User } from "./user.model";


// const createUserFunction = async (req: Response, res: Response) => {

//     const user = await UserServices.createUser(req.body)

//     res.status(httpStatus.CREATED).json({
//         message: "User Created Successfully",
//         user
//     })
// }

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error("Fake eror")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

//         // createUserFunction(req, res)

//     } catch (err: any) {
//         console.log(err);
//         next(err)
//     }
// }
const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUser(req.body)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })
console.log("Register response:", user);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    console.log("userId in controller:", userId);
    if (!userId) {
        throw new Error("User ID is required");
    }

    console.log("req.user in controller:", req.user);
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;

    const payload = req.body;
    console.log("Payload in controller:", payload);
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,   // ✅ FIXED
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    });
});
const getMe = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken.userId);

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})


 const blockOrUnblockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
const { isActive } = req.body || {};
console.log("isActive", isActive);
if (isActive === undefined) {
  return res.status(400).json({
    success: false,
    message: "isActive is required"
  });
}
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `User status updated to ${isActive}`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  console.log("Request body received at backend:", req.body); // 🔥
  const user = req.user as JwtPayload;
  const payload = req.body;
  const result = await UserServices.updateMyProfile(user.userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});


export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
   updateMyProfile,
    blockOrUnblockUser,
 

}