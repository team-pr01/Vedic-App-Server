"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
