import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

// User Signup
const signup = catchAsync(async (req, res) => {
  console.log(req.body);
  // const file = req.file;
  const result = await AuthServices.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registration successful.",
    data: result,
  });
});

// User Login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully.",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully.",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const result = await AuthServices.forgetPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link sent to your email.Please check.",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully.",
    data: result,
  });
});

// Change User Role (For admin)
const changeUserRole = catchAsync(async (req, res) => {
console.log(req.body);
  const result = await AuthServices.changeUserRole(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully.",
    data: result,
  });
});


export const AuthControllers = {
  signup,
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
  changeUserRole,
};
