"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReelCategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const ReelCategory = (0, mongoose_1.model)("ReelCategory", ReelCategorySchema);
exports.default = ReelCategory;
