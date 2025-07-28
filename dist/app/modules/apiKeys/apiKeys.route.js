"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const apiKeys_controller_1 = require("./apiKeys.controller");
const router = express_1.default.Router();
// Add API Key (Admin/Moderator/Super Admin only)
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), apiKeys_controller_1.ApiKeyControllers.addApiKey);
// Get all API Keys (Public or secure depending on use-case)
router.get("/", apiKeys_controller_1.ApiKeyControllers.getAllApiKeys);
// Delete API Key by ID (Admin/Moderator/Super Admin only)
router.delete("/:apiKeyId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), apiKeys_controller_1.ApiKeyControllers.deleteApiKey);
exports.ApiKeyRoutes = router;
