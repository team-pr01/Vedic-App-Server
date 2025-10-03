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
exports.DailyHoroscopeServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const dailyHoroscope_model_1 = __importDefault(require("./dailyHoroscope.model"));
// Add Daily Horoscope
const addDailyHoroscope = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dailyHoroscope_model_1.default.create(payload);
    return result;
});
// Get all Daily Horoscopes
const getAllDailyHoroscopes = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { color: { $regex: keyword, $options: "i" } },
            { number: { $regex: keyword, $options: "i" } },
            { direction: { $regex: keyword, $options: "i" } },
        ];
    }
    const result = yield dailyHoroscope_model_1.default.find(query);
    return result;
});
// Get single Daily Horoscope by ID
const getSingleDailyHoroscopeById = (horoscopeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dailyHoroscope_model_1.default.findById(horoscopeId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Daily horoscope not found");
    }
    return result;
});
// Update Daily Horoscope
const updateDailyHoroscope = (horoscopeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield dailyHoroscope_model_1.default.findById(horoscopeId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Daily horoscope not found");
    }
    const result = yield dailyHoroscope_model_1.default.findByIdAndUpdate(horoscopeId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Daily Horoscope
const deleteDailyHoroscope = (horoscopeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dailyHoroscope_model_1.default.findByIdAndDelete(horoscopeId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Daily horoscope not found");
    }
    return result;
});
exports.DailyHoroscopeServices = {
    addDailyHoroscope,
    getAllDailyHoroscopes,
    getSingleDailyHoroscopeById,
    updateDailyHoroscope,
    deleteDailyHoroscope,
};
