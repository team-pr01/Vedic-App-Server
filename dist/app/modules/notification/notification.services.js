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
exports.NotificationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const notification_model_1 = __importDefault(require("./notification.model"));
const addNotification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.default.create(payload);
    return result;
});
const getAllNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield notification_model_1.default.find();
});
const getSingleNotificationById = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.default.findById(notificationId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    }
    return result;
});
const updateNotification = (notificationId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield notification_model_1.default.findById(notificationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    }
    const result = yield notification_model_1.default.findByIdAndUpdate(notificationId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteNotification = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield notification_model_1.default.findById(notificationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Notification not found");
    }
    return yield notification_model_1.default.findByIdAndDelete(notificationId);
});
exports.NotificationServices = {
    addNotification,
    getAllNotifications,
    getSingleNotificationById,
    updateNotification,
    deleteNotification,
};
