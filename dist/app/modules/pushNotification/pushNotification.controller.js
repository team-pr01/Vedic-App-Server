"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const pushNotification_services_1 = require("./pushNotification.services");
const server_1 = require("../../../server");
// Send push notification
const sendPushNotificationToUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds, title, message, data } = req.body;
    const result = yield pushNotification_services_1.PushNotificationServices.sendPushNotificationToUsers({
        userIds,
        title,
        message,
        data,
    });
    server_1.io.emit("new-push-notification", {
        title: "Emergency Message",
        message: message,
        createdAt: Date.now(),
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Push notifications processed",
        data: result,
    });
}));
// Get All Notifications
const getAllPushNotificationForUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield pushNotification_services_1.PushNotificationServices.getAllPushNotificationForUser(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Notifications fetched successfully",
        data: result,
    });
}));
exports.PushNotificationControllers = {
    sendPushNotificationToUsers,
    getAllPushNotificationForUser,
};
