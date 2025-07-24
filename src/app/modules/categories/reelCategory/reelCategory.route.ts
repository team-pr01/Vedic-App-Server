import express from "express";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";
import authorizeRoute from "../../../middlewares/authorizeRoute";
import { ReelCategoryController } from "./reelCategory.controller";

const router = express.Router();

// Add reel category (admin only)
router.post(
  "/add-category",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ReelCategoryController.addReelCategory
);

// Get all reel categories
router.get("/", ReelCategoryController.getAllReelCategories);

// Get a single reel category by ID
router.get("/:categoryId", ReelCategoryController.getSingleReelCategoryById);

// Delete a reel category (admin only)
router.delete(
  "/:categoryId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ReelCategoryController.deleteReelCategory
);

export const ReelCategoryRoutes = router;
