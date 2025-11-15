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
exports.ProductBannerControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const productBanner_services_1 = require("./productBanner.services");
// Add Product Banner
const addProductBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield productBanner_services_1.ProductBannerServices.addProductBanner(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product banner created successfully",
        data: result,
    });
}));
// Get all Product Banners
const getAllProductBanners = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productBanner_services_1.ProductBannerServices.getAllProductBanners();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product banners fetched successfully",
        data: result,
    });
}));
// Get single Product Banner by ID
const getSingleProductBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bannerId } = req.params;
    const result = yield productBanner_services_1.ProductBannerServices.getSingleProductBanner(bannerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product banner fetched successfully",
        data: result,
    });
}));
// Update Product Banner
const updateProductBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bannerId } = req.params;
    const file = req.file;
    const result = yield productBanner_services_1.ProductBannerServices.updateProductBanner(bannerId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product banner updated successfully",
        data: result,
    });
}));
// Delete Product Banner
const deleteProductBanner = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bannerId } = req.params;
    const result = yield productBanner_services_1.ProductBannerServices.deleteProductBanner(bannerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product banner deleted successfully",
        data: result,
    });
}));
exports.ProductBannerControllers = {
    addProductBanner,
    getAllProductBanners,
    getSingleProductBanner,
    updateProductBanner,
    deleteProductBanner,
};
