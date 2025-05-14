import express from "express";
import { EmergencyControllers } from "./emergency.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

router.post(
  "/",
  EmergencyControllers.postEmergency
);

router.get("/", auth(UserRole.admin), EmergencyControllers.getAllEmergencyPosts);
router.get("/:emergencyId", auth(UserRole.admin), EmergencyControllers.getSingleEmergencyPostById);

router.delete("/:emergencyId", auth(UserRole.admin), EmergencyControllers.deleteEmergencyPost);

export const EmergencyRoutes = router;
