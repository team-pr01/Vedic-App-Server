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
exports.PushNotificationServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const auth_model_1 = require("../auth/auth.model");
const pushNotification_model_1 = __importDefault(require("./pushNotification.model"));
const expo = new expo_server_sdk_1.default();
const sendPushNotificationToUsers = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userIds, title, message, data } = payload;
    // 1) Fetch users
    const users = yield auth_model_1.User.find({ _id: { $in: userIds } }).select('_id expoPushToken');
    if (!users || users.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No users found for provided ids');
    }
    // 2) Create notification docs for each fetched user (preserve user order)
    const notificationsToInsert = users.map((u) => ({
        user: u._id,
        title,
        message,
        data,
        deliveryStatus: 'pending',
    }));
    const createdNotifications = yield pushNotification_model_1.default.insertMany(notificationsToInsert, { ordered: true });
    // 3) Build messages and mapping (maps message index -> notification id)
    const messages = [];
    const mapping = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const notif = createdNotifications[i];
        // skip users without a token but keep their Notification doc (already created)
        if (!user.expoPushToken || !expo_server_sdk_1.default.isExpoPushToken(user.expoPushToken)) {
            yield pushNotification_model_1.default.updateOne({ _id: notif._id }, { $set: { deliveryStatus: 'failed', expoTicket: { error: 'no_or_invalid_expo_token' } } });
            continue;
        }
        messages.push({
            to: user.expoPushToken,
            sound: 'default',
            title,
            body: message,
            data,
        });
        mapping.push({ notificationId: notif._id });
    }
    // 4) Send messages in chunks, update Notification docs with tickets/results
    const tickets = [];
    const chunks = expo.chunkPushNotifications(messages);
    let messageStartIndex = 0;
    for (const chunk of chunks) {
        try {
            const ticketChunk = yield expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
            // update the Notification docs corresponding to this chunk
            for (let i = 0; i < ticketChunk.length; i++) {
                const ticket = ticketChunk[i];
                const mapIndex = messageStartIndex + i;
                const notificationId = (_a = mapping[mapIndex]) === null || _a === void 0 ? void 0 : _a.notificationId;
                if (!notificationId)
                    continue;
                const status = ticket.id ? 'sent' : 'failed';
                yield pushNotification_model_1.default.updateOne({ _id: notificationId }, { $set: { deliveryStatus: status, expoTicket: ticket } });
            }
            messageStartIndex += ticketChunk.length;
        }
        catch (error) {
            // log error and mark notifications in this chunk as failed
            console.error('Error sending Expo chunk:', error);
            for (let i = 0; i < chunk.length; i++) {
                const mapIndex = messageStartIndex + i;
                const notificationId = (_b = mapping[mapIndex]) === null || _b === void 0 ? void 0 : _b.notificationId;
                if (!notificationId)
                    continue;
                yield pushNotification_model_1.default.updateOne({ _id: notificationId }, { $set: { deliveryStatus: 'failed', expoTicket: { error: String(error) } } });
            }
            messageStartIndex += chunk.length;
            // continue to next chunk (or you could choose to throw)
        }
    }
    return {
        createdNotificationsCount: createdNotifications.length,
        pushedCount: mapping.length,
        tickets,
    };
});
// Get All Popups (with optional title search)
const getAllPushNotificationForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pushNotification_model_1.default.find({ user: userId });
    return result;
});
exports.PushNotificationServices = {
    sendPushNotificationToUsers,
    getAllPushNotificationForUser,
};
