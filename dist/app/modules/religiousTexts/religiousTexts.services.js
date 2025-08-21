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
exports.ReligiousTextServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const religiousTexts_model_1 = __importDefault(require("./religiousTexts.model"));
// Create Religious Text
const createReligiousText = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield religiousTexts_model_1.default.create(payload);
    return result;
});
// Get All Religious Texts (with optional vedaName and originalText search)
const getAllReligiousTexts = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters.vedaName) {
        query.vedaName = filters.vedaName;
    }
    if (filters.keyword) {
        query.originalText = { $regex: filters.keyword, $options: "i" };
    }
    const result = yield religiousTexts_model_1.default.find(query).sort({ createdAt: -1 });
    return result;
});
// Get Single Religious Text by ID
const getReligiousTextById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield religiousTexts_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Religious text not found");
    }
    return result;
});
// Update Religious Text
const updateReligiousText = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield religiousTexts_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Religious text not found");
    }
    const result = yield religiousTexts_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Religious Text
const deleteReligiousText = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield religiousTexts_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Religious text not found");
    }
    return yield religiousTexts_model_1.default.findByIdAndDelete(id);
});
exports.ReligiousTextServices = {
    createReligiousText,
    getAllReligiousTexts,
    getReligiousTextById,
    updateReligiousText,
    deleteReligiousText,
};
