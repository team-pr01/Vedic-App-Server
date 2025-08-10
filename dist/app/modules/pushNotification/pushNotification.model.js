"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/notification.model.ts
const mongoose_1 = require("mongoose");
const PushNotificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    read: { type: Boolean, default: false },
    deliveryStatus: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
    },
    expoTicket: { type: mongoose_1.Schema.Types.Mixed },
}, { timestamps: true });
const PushNotification = (0, mongoose_1.model)("PushNotification", PushNotificationSchema);
exports.default = PushNotification;
