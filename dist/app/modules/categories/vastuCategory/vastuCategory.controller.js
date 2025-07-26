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
exports.VastuCategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const vastuCategory_services_1 = require("./vastuCategory.services");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
// Add vastu category (Admin only)
const addVastuCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vastuCategory_services_1.VastuCategoryServices.addVastuCategory(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu category added successfully",
        data: result,
    });
}));
// Get all vastu categories
const getAllVastuCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vastuCategory_services_1.VastuCategoryServices.getAllVastuCategories();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu categories fetched successfully",
        data: result,
    });
}));
// Get single vastu category by ID
const getSingleVastuCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield vastuCategory_services_1.VastuCategoryServices.getSingleVastuCategoryById(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu category fetched successfully",
        data: result,
    });
}));
// Delete vastu category by ID
const deleteVastuCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield vastuCategory_services_1.VastuCategoryServices.deleteVastuCategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu category deleted successfully",
        data: result,
    });
}));
exports.VastuCategoryController = {
    addVastuCategory,
    getAllVastuCategories,
    getSingleVastuCategoryById,
    deleteVastuCategory,
};
