"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const notification_controller_1 = require("./notification.controller");
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const router = express_1.default.Router();
router.post("/send-notification", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), notification_controller_1.NotificationControllers.sendNotification);
router.get("/", notification_controller_1.NotificationControllers.getAllNotifications);
router.get('/:userId', notification_controller_1.NotificationControllers.getAllNotificationsForUser);
exports.NotificationRoutes = router;
