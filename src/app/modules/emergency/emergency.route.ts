import express from "express";
import { EmergencyControllers } from "./emergency.controller";

const router = express.Router();

router.post(
  "/",
  EmergencyControllers.postEmergency
);

router.get("/", EmergencyControllers.getAllEmergencyPosts);
router.get("/:emergencyId", EmergencyControllers.getSingleEmergencyPostById);

router.put("/delete-product/:emergencyId", EmergencyControllers.deleteProduct);
router.delete("/delete-product/:emergencyId", EmergencyControllers.deleteProduct);

export const EmergencyRoutes = router;
