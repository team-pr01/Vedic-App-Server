"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VastuCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../../middlewares/authorizeRoute"));
const vastuCategory_controller_1 = require("./vastuCategory.controller");
const router = express_1.default.Router();
// Add vastu category (admin only)
router.post("/add-category", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastuCategory_controller_1.VastuCategoryController.addVastuCategory);
// Get all vastu categories
router.get("/", vastuCategory_controller_1.VastuCategoryController.getAllVastuCategories);
// Get a single vastu category by ID
router.get("/:categoryId", vastuCategory_controller_1.VastuCategoryController.getSingleVastuCategoryById);
// Delete a vastu category (admin only)
router.delete("/:categoryId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), vastuCategory_controller_1.VastuCategoryController.deleteVastuCategory);
exports.VastuCategoryRoutes = router;
