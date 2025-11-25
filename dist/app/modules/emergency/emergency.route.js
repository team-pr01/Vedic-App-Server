"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const emergency_controller_1 = require("./emergency.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
// For users
router.post("/post", emergency_controller_1.EmergencyControllers.postEmergency);
// Just for admin
router.post("/send-message", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.sendEmergencyMessageAdmin);
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.getAllEmergencyPosts);
router.get("/:emergencyId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.getSingleEmergencyPostById);
router.put("/:emergencyId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.updateEmergencyPost);
router.put("/update-status/:emergencyId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.changeEmergencyPostStatus);
router.delete("/:emergencyId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), emergency_controller_1.EmergencyControllers.deleteEmergencyPost);
exports.EmergencyRoutes = router;
