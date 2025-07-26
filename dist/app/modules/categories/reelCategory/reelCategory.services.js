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
exports.ReelCategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const reelCategory_model_1 = __importDefault(require("./reelCategory.model"));
// Add reel category (Admin only)
const addReelCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = payload;
    const payloadData = {
        category
    };
    const result = yield reelCategory_model_1.default.create(payloadData);
    return result;
});
// Get all reel categories
const getAllReelCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reelCategory_model_1.default.find();
    return result;
});
// Get single reel category by ID
const getSingleReelCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reelCategory_model_1.default.findById(categoryId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Reel category not found");
    }
    return result;
});
// Delete reel category by ID
const deleteReelCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reelCategory_model_1.default.findByIdAndDelete(categoryId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Reel category not found");
    }
    return result;
});
exports.ReelCategoryServices = {
    addReelCategory,
    getAllReelCategories,
    getSingleReelCategoryById,
    deleteReelCategory,
};
