"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VastuCategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const VastuCategory = (0, mongoose_1.model)("VastuCategory", VastuCategorySchema);
exports.default = VastuCategory;
