import express from "express";
import { PushNotificationControllers } from "./pushNotification.controller";

const router = express.Router();

router.post(
  "/send-notification",
  PushNotificationControllers.sendPushNotificationToUsers
);

export const PushNotificationRoutes = router;