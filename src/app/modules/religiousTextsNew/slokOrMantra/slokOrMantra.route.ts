import express from "express";
import { SlokOrMantraController } from "./slokOrMantra.controller";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";

const router = express.Router();

// Create a new slok or mantra (protected: admin, moderator, super-admin)
router.post(
  "/create",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  SlokOrMantraController.createSlokOrMantra
);

// Get all sloks or mantras (public)
router.get("/", SlokOrMantraController.getAllSlokOrMantras);

// Get a single slok or mantra by ID (public)
router.get("/:id", SlokOrMantraController.getSingleSlokOrMantra);

// Update a slok or mantra (protected)
router.put(
  "/update/:id",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  SlokOrMantraController.updateSlokOrMantra
);

// Delete a slok or mantra (protected)
router.delete(
  "/delete/:id",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  SlokOrMantraController.deleteSlokOrMantra
);

export const SlokOrMantraRoutes = router;