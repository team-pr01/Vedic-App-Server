"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlokOrMantraRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slokOrMantra_controller_1 = require("./slokOrMantra.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const router = express_1.default.Router();
// Create a new slok or mantra (protected: admin, moderator, super-admin)
router.post("/create", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), slokOrMantra_controller_1.SlokOrMantraController.createSlokOrMantra);
// Get all sloks or mantras (public)
router.get("/", slokOrMantra_controller_1.SlokOrMantraController.getAllSlokOrMantras);
// Get a single slok or mantra by ID (public)
router.get("/:id", slokOrMantra_controller_1.SlokOrMantraController.getSingleSlokOrMantra);
// Update a slok or mantra (protected)
router.put("/update/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), slokOrMantra_controller_1.SlokOrMantraController.updateSlokOrMantra);
// Delete a slok or mantra (protected)
router.delete("/delete/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), slokOrMantra_controller_1.SlokOrMantraController.deleteSlokOrMantra);
exports.SlokOrMantraRoutes = router;
