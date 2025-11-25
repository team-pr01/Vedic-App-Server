import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { NotificationControllers } from "./notification.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

router.post("/send-notification", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), NotificationControllers.sendNotification);

router.get("/", NotificationControllers.getAllNotifications);
router.get('/:userId', NotificationControllers.getAllNotificationsForUser);

export const NotificationRoutes = router;