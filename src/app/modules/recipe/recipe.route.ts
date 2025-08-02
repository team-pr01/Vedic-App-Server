import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { RecipeControllers } from "./recipe.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// For admin only
router.post(
  "/add-recipe",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  RecipeControllers.addRecipe
);

// Public routes
router.get("/", RecipeControllers.getAllRecipes);
router.get("/:recipeId", RecipeControllers.getSingleRecipeById);

// Admin/moderator/super-admin routes
router.put(
  "/:recipeId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  RecipeControllers.updateRecipe
);

router.delete(
  "/:recipeId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  RecipeControllers.deleteRecipe
);

export const RecipeRoutes = router;
