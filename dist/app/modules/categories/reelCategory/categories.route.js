"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../../middlewares/authorizeRoute"));
const categories_controller_1 = require("./categories.controller");
const router = express_1.default.Router();
// Add reel category (admin only)
router.post("/add-category", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), categories_controller_1.CategoryController.addCategory);
// Get all reel categories
router.get("/", categories_controller_1.CategoryController.getAllCategories);
// Get a single reel category by ID
router.get("/:categoryId", categories_controller_1.CategoryController.getSingleCategoryById);
// Delete a reel category (admin only)
router.delete("/:categoryId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), categories_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
