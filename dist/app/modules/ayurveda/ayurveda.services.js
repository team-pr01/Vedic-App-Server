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
exports.AyurvedaServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ayurveda_model_1 = __importDefault(require("./ayurveda.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Add Ayurveda (for admin only)
const addAyurveda = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoUrl, expertName, duration, content, category } = payload;
    let imageUrl = "";
    if (file) {
        const imageName = `${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = {
        imageUrl,
        videoUrl,
        expertName,
        duration,
        content,
        category,
    };
    const result = yield ayurveda_model_1.default.create(payloadData);
    return result;
});
// Get all Ayurveda
const getAllAyurveda = (keyword, category) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [{ expertName: { $regex: keyword, $options: "i" } }];
        query.$or = [{ content: { $regex: keyword, $options: "i" } }];
    }
    if (category) {
        query.category = category;
    }
    const result = yield ayurveda_model_1.default.find(query);
    return result;
});
// Get single Ayurveda by id
const getSingleAyurvedaById = (ayurvedaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ayurveda_model_1.default.findById(ayurvedaId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Ayurveda item not found");
    }
    return result;
});
// Update Ayurveda
const updateAyurveda = (ayurvedaId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield ayurveda_model_1.default.findById(ayurvedaId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Ayurveda item not found");
    }
    const result = yield ayurveda_model_1.default.findByIdAndUpdate(ayurvedaId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Ayurveda
const deleteAyurveda = (ayurvedaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ayurveda_model_1.default.findByIdAndDelete(ayurvedaId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Ayurveda item not found");
    }
    return result;
});
exports.AyurvedaServices = {
    addAyurveda,
    getAllAyurveda,
    getSingleAyurvedaById,
    updateAyurveda,
    deleteAyurveda,
};
