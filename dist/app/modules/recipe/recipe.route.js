"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const recipe_controller_1 = require("./recipe.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
// For admin only
router.post("/add-recipe", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), recipe_controller_1.RecipeControllers.addRecipe);
// Public routes
router.get("/", recipe_controller_1.RecipeControllers.getAllRecipes);
router.get("/:recipeId", recipe_controller_1.RecipeControllers.getSingleRecipeById);
// Admin/moderator/super-admin routes
router.put("/:recipeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), recipe_controller_1.RecipeControllers.updateRecipe);
router.delete("/:recipeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), recipe_controller_1.RecipeControllers.deleteRecipe);
exports.RecipeRoutes = router;
