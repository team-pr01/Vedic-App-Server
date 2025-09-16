"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("./product.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Add Product (for admin)
const addProduct = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, productLink, description, price, currency, label, tags, videoUrl, } = payload;
    let imageUrl = "";
    if (file) {
        const imageName = `${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = {
        imageUrl: imageUrl ? imageUrl : "",
        name,
        category,
        productLink,
        description,
        price,
        currency,
        label,
        tags,
        videoUrl: videoUrl || "",
        clicks: 0,
    };
    const result = yield product_model_1.default.create(payloadData);
    return result;
});
// Get all Products with pagination, search, and category filter
const getAllProducts = (keyword_1, category_1, ...args_1) => __awaiter(void 0, [keyword_1, category_1, ...args_1], void 0, function* (keyword, category, page = 1, limit = 10) {
    const query = {};
    if (keyword) {
        query.name = { $regex: keyword, $options: "i" };
    }
    if (category) {
        query.category = category;
    }
    const skip = (page - 1) * limit;
    const [data, total] = yield Promise.all([
        product_model_1.default.find(query).skip(skip).limit(limit),
        product_model_1.default.countDocuments(query),
    ]);
    const meta = {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
    return { data, meta };
});
// Get single Product by id
const getSingleProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return result;
});
// Update Product
const updateProduct = (productId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield product_model_1.default.findById(productId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    if (file) {
        const imageName = `${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.imageUrl = secure_url;
    }
    const result = yield product_model_1.default.findByIdAndUpdate(productId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Update Product
const updateProductClick = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield product_model_1.default.findById(productId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const result = yield product_model_1.default.findByIdAndUpdate(productId, { clicks: (existing === null || existing === void 0 ? void 0 : existing.clicks) && (existing === null || existing === void 0 ? void 0 : existing.clicks) + 1 }, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Product
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(productId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return result;
});
exports.ProductServices = {
    addProduct,
    getAllProducts,
    getSingleProductById,
    updateProduct,
    updateProductClick,
    deleteProduct,
};
