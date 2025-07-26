"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../../middlewares/authorizeRoute"));
const reelCategory_controller_1 = require("./reelCategory.controller");
const router = express_1.default.Router();
// Add reel category (admin only)
router.post("/add-category", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), reelCategory_controller_1.ReelCategoryController.addReelCategory);
// Get all reel categories
router.get("/", reelCategory_controller_1.ReelCategoryController.getAllReelCategories);
// Get a single reel category by ID
router.get("/:categoryId", reelCategory_controller_1.ReelCategoryController.getSingleReelCategoryById);
// Delete a reel category (admin only)
router.delete("/:categoryId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), reelCategory_controller_1.ReelCategoryController.deleteReelCategory);
exports.ReelCategoryRoutes = router;
