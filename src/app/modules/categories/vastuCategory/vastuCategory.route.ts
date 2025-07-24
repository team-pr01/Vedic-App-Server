import express from "express";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";
import authorizeRoute from "../../../middlewares/authorizeRoute";
import { VastuCategoryController } from "./vastuCategory.controller";

const router = express.Router();

// Add vastu category (admin only)
router.post(
  "/add-category",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  VastuCategoryController.addVastuCategory
);

// Get all vastu categories
router.get("/", VastuCategoryController.getAllVastuCategories);

// Get a single vastu category by ID
router.get("/:categoryId", VastuCategoryController.getSingleVastuCategoryById);

// Delete a vastu category (admin only)
router.delete(
  "/:categoryId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  VastuCategoryController.deleteVastuCategory
);

export const VastuCategoryRoutes = router;