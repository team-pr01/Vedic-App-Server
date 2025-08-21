"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Recipe = (0, mongoose_1.model)("Recipe", CategorySchema);
exports.default = Recipe;
