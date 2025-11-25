import express from "express";
import { EmergencyControllers } from "./emergency.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// For users
router.post("/post", EmergencyControllers.postEmergency);
// Just for admin
router.post("/send-message", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.sendEmergencyMessageAdmin);

router.get("/", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.getAllEmergencyPosts);
router.get("/:emergencyId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.getSingleEmergencyPostById);

router.put("/:emergencyId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.updateEmergencyPost);
router.put("/update-status/:emergencyId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.changeEmergencyPostStatus);

router.delete("/:emergencyId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), EmergencyControllers.deleteEmergencyPost);

export const EmergencyRoutes = router;