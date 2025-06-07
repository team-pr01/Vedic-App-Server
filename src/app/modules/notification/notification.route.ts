import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { NotificationControllers } from "./notification.controller";

const router = express.Router();

router.post("/send-notification", auth(UserRole.admin), NotificationControllers.addNotification);

router.get("/", NotificationControllers.getAllNotifications);
router.get("/:notificationId", NotificationControllers.getSingleNotificationById);

router.put("/:notificationId", auth(UserRole.admin), NotificationControllers.updateNotification);

router.delete("/:notificationId", auth(UserRole.admin), NotificationControllers.deleteNotification);

export const NotificationRoutes = router;