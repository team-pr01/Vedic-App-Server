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
exports.ChapterService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const chapter_model_1 = __importDefault(require("./chapter.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const createChapter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield chapter_model_1.default.create(payload);
    return result;
});
const getAllChapters = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield chapter_model_1.default.find();
});
const getSingleChapter = (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = yield chapter_model_1.default.findById(chapterId);
    if (!chapter) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chapter not found");
    }
    return chapter;
});
const updateChapter = (chapterId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = yield chapter_model_1.default.findByIdAndUpdate(chapterId, payload, {
        new: true,
        runValidators: true,
    });
    if (!chapter) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chapter not found");
    }
    return chapter;
});
const deleteChapter = (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedChapter = yield chapter_model_1.default.findByIdAndDelete(chapterId);
    if (!deletedChapter) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Chapter not found");
    }
    return deletedChapter;
});
exports.ChapterService = {
    createChapter,
    getAllChapters,
    getSingleChapter,
    updateChapter,
    deleteChapter,
};
