"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PopupSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    btnText: {
        type: String,
        required: true,
    },
    btnLink: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    displayFrequency: {
        type: String,
        required: true,
        enum: ["Once", "Every Visit", "Daily", "Weekly"],
    },
}, { timestamps: true });
const Popup = (0, mongoose_1.model)("Popup", PopupSchema);
exports.default = Popup;
