"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AyurvedaSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: false,
        default: "",
    },
    videoUrl: {
        type: String,
        required: false,
        default: "",
    },
    category: {
        type: String,
        required: true,
    },
    expertName: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Ayurveda = (0, mongoose_1.model)("Ayurveda", AyurvedaSchema);
exports.default = Ayurveda;
