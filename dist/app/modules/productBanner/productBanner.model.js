"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductBannerSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: false,
        default: "",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const ProductBanner = (0, mongoose_1.model)("ProductBanner", ProductBannerSchema);
exports.default = ProductBanner;
