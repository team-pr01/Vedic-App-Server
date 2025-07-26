import express from "express";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";
import authorizeRoute from "../../../middlewares/authorizeRoute";
import { CategoryController } from "./categories.controller";

const router = express.Router();

// Add reel category (admin only)
router.post(
  "/add-category",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  CategoryController.addCategory
);

// Get all reel categories
router.get("/", CategoryController.getAllCategories);

// Get a single reel category by ID
router.get("/:categoryId", CategoryController.getSingleCategoryById);

// Delete a reel category (admin only)
router.delete(
  "/:categoryId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
