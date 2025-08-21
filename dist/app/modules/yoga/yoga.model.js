"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const YogaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    sanskritName: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },
    duration: {
        type: String,
        required: true,
    },
    benefits: {
        type: [String],
        default: [],
    },
    contraindications: {
        type: [String],
        default: [],
    },
    categories: {
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
const Yoga = (0, mongoose_1.model)("Yoga", YogaSchema);
exports.default = Yoga;
