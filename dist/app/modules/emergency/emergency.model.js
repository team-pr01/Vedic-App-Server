"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyMessageAdmin = void 0;
const mongoose_1 = require("mongoose");
const EmergencySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ["low", "moderate", "high", "critical"],
        default: "moderate",
    },
    status: {
        type: String,
        enum: ["pending", "processing", "resolved"],
        default: "pending",
    },
    resolvedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Emergency = (0, mongoose_1.model)("Emergency", EmergencySchema);
exports.default = Emergency;
const EmergencyMessageAdminSchema = new mongoose_1.Schema({
    emergencyMessageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Emergency",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userIds: {
        type: [String],
        required: true
    },
    adminMessage: {
        type: String,
        required: false,
        default: "Emergency message from admin"
    },
}, {
    timestamps: true,
});
exports.EmergencyMessageAdmin = (0, mongoose_1.model)("EmergencyMessageAdmin", EmergencyMessageAdminSchema);
