"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VastuSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Vastu = (0, mongoose_1.model)("Vastu", VastuSchema);
exports.default = Vastu;
