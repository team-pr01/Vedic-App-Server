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
exports.NewsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const news_model_1 = __importDefault(require("./news.model"));
const addNews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.default.create(payload);
    return result;
});
const getAllNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.default.find();
});
const getSingleNewsById = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield news_model_1.default.findById(newsId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    return result;
});
const updateNews = (newsId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield news_model_1.default.findById(newsId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    const result = yield news_model_1.default.findByIdAndUpdate(newsId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteNews = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield news_model_1.default.findById(newsId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "News not found");
    }
    return yield news_model_1.default.findByIdAndDelete(newsId);
});
exports.NewsServices = {
    addNews,
    getAllNews,
    getSingleNewsById,
    updateNews,
    deleteNews,
};
