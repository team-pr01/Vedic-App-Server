"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VastuSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    importance: {
        type: String,
        enum: ["high", "medium", "low"],
        required: true,
    },
    recommendations: {
        type: [String],
        default: [],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Vastu = (0, mongoose_1.model)("Vastu", VastuSchema);
exports.default = Vastu;
