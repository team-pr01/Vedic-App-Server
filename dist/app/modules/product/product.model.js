"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: false,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: false,
        default: "",
    },
    clicks: {
        type: Number,
        required: false,
        default: 0,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
