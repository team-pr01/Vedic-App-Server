"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const temples_controller_1 = require("./temples.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
// For admin only
// router.post("/add-temple", TempleControllers.addTemple);
router.post("/add-temple", multer_config_1.multerUpload.single("file"), temples_controller_1.TempleControllers.addTemple);
// temples.routes.ts (or in your main router config)
router.post("/:templeId/events", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), temples_controller_1.TempleControllers.addEventToTemple);
router.delete("/:templeId/events/:eventId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), temples_controller_1.TempleControllers.deleteEventFromTemple);
router.get("/", temples_controller_1.TempleControllers.getAllTemples);
router.get("/:templeId", temples_controller_1.TempleControllers.getSingleTempleById);
router.put("/:templeId", temples_controller_1.TempleControllers.updateTemple);
router.put("/update-status/:templeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), temples_controller_1.TempleControllers.updateTempleStatus);
router.delete("/:templeId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), temples_controller_1.TempleControllers.deleteTemple);
exports.TempleRoutes = router;
