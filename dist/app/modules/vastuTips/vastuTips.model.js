"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VastuTipsSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tips: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});
const VastuTips = (0, mongoose_1.model)("VastuTips", VastuTipsSchema);
exports.default = VastuTips;
