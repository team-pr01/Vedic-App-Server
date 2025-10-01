import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { BulkSmsControllers } from "./bulkSms.controller";

const router = express.Router();

// Add API Key (Admin/Moderator/Super Admin only)
router.post(
  "/send-bulk-email",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  BulkSmsControllers.sendBulkEmail
);


export const BulkSmsRoutes = router;
