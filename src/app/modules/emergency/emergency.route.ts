import express from "express";
import { EmergencyControllers } from "./emergency.controller";

const router = express.Router();

router.post(
  "/",
  EmergencyControllers.postEmergency
);

router.get("/", EmergencyControllers.getAllProducts);
router.get("/:productId", EmergencyControllers.getSingleProductById);

router.delete("/delete-product/:productId", EmergencyControllers.deleteProduct);

export const EmergencyRoutes = router;
