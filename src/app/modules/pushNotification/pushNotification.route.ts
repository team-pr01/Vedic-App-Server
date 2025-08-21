import express from "express";
import { PushNotificationControllers } from "./pushNotification.controller";

const router = express.Router();

router.post(
  "/send-notification",
  PushNotificationControllers.sendPushNotificationToUsers
);

router.get('/:userId', PushNotificationControllers.getAllPushNotificationForUser);

export const PushNotificationRoutes = router;