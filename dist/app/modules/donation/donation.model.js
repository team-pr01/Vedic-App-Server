"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DonationSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: false },
    donationProgramId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "DonationProgram",
        required: true,
    },
    donationProgramTitle: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userPhoneNumber: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Donation = (0, mongoose_1.model)("Donation", DonationSchema);
exports.default = Donation;
