import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "./auth.constannts";
import { multerUpload } from "../../config/multer.config";
// import { upload } from "../../utils/sendImageToCloudinary";
const router = express.Router();

router.post("/signup", multerUpload.single("file"), AuthControllers.signup);

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
  AuthControllers.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

router.post(
  "/save-push-notification-token",
  AuthControllers.savePushToken
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
