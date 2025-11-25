"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    deliveryStatus: {
        type: String,
        enum: ["pending", "sent", "failed"],
        default: "pending",
    },
    expoTicket: { type: mongoose_1.Schema.Types.Mixed },
}, {
    timestamps: true,
});
const Notification = (0, mongoose_1.model)("Notification", NotificationSchema);
exports.default = Notification;
