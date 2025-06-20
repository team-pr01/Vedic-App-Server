import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "./auth.constannts";
// import { upload } from "../../utils/sendImageToCloudinary";
const router = express.Router();

router.post("/signup", AuthControllers.signup);

router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

router.put(
  "/change-role",
  auth(UserRole.admin),
  AuthControllers.changeUserRole
);

router.put(
  "/assign-pages",
  auth(UserRole.admin),
  AuthControllers.assignPagesToUser
);

export const AuthRoute = router;
