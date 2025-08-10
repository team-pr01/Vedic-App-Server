"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pushNotification_controller_1 = require("./pushNotification.controller");
const router = express_1.default.Router();
router.post("/send-notification", pushNotification_controller_1.PushNotificationControllers.sendPushNotificationToUsers);
router.get('/:userId', pushNotification_controller_1.PushNotificationControllers.getAllPushNotificationForUser);
exports.PushNotificationRoutes = router;
