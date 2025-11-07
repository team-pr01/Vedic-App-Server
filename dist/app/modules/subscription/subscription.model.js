"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubscriptionSchema = new mongoose_1.Schema({
    subscriptionPlanName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    senderAccountNumber: {
        type: String,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
const Subscription = (0, mongoose_1.model)("Subscription", SubscriptionSchema);
exports.default = Subscription;
