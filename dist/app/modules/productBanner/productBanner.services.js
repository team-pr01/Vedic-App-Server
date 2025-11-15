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
exports.ProductBannerServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const productBanner_model_1 = __importDefault(require("./productBanner.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Add Product Banner
const addProductBanner = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, link } = payload;
    let imageUrl = "";
    if (file) {
        const imageName = `${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = {
        imageUrl: imageUrl || "",
        title,
        description,
        link,
    };
    const result = yield productBanner_model_1.default.create(payloadData);
    return result;
});
// Get all Product Banners (pagination + search)
const getAllProductBanners = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productBanner_model_1.default.find();
    return result;
});
// Get single Product Banner
const getSingleProductBanner = (bannerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productBanner_model_1.default.findById(bannerId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product banner not found");
    }
    return result;
});
// Update Product Banner
const updateProductBanner = (bannerId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield productBanner_model_1.default.findById(bannerId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product banner not found");
    }
    if (file) {
        const imageName = `${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.imageUrl = secure_url;
    }
    const result = yield productBanner_model_1.default.findByIdAndUpdate(bannerId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Product Banner
const deleteProductBanner = (bannerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productBanner_model_1.default.findByIdAndDelete(bannerId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product banner not found");
    }
    return result;
});
exports.ProductBannerServices = {
    addProductBanner,
    getAllProductBanners,
    getSingleProductBanner,
    updateProductBanner,
    deleteProductBanner,
};
