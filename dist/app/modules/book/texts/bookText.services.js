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
exports.BookTextService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bookText_model_1 = __importDefault(require("./bookText.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const createBookText = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookText_model_1.default.create(payload);
    return result;
});
const getAllBookTexts = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (keyword) {
        const regex = new RegExp(keyword, "i");
        query = {
            $or: [
                { "location.chapter": regex },
                { "location.verse": regex },
                { originalText: regex },
                { primaryTranslation: regex },
                { tags: regex },
            ],
        };
    }
    return yield bookText_model_1.default.find(query).populate("bookId", "name type structure");
});
const getSingleBookText = (bookTextId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookText = yield bookText_model_1.default.findById(bookTextId).populate("bookId", "name type structure");
    if (!bookText) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book text not found");
    }
    return bookText;
});
const getBookTextByDetails = (bookId, searchLevels // dynamic levels, e.g., { Chapter: "1", Verse: "2" }
) => __awaiter(void 0, void 0, void 0, function* () {
    // Build dynamic $and query for all levels
    const locationQuery = Object.entries(searchLevels).map(([levelName, value]) => ({
        location: { $elemMatch: { levelName, value } },
    }));
    const bookText = yield bookText_model_1.default.findOne({
        bookId,
        $and: locationQuery,
    }).populate("bookId", "name type structure");
    if (!bookText) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book text not found with given details");
    }
    return bookText;
});
const updateBookText = (bookTextId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield bookText_model_1.default.findById(bookTextId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book text not found");
    }
    const result = yield bookText_model_1.default.findByIdAndUpdate(bookTextId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBookText = (bookTextId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookText_model_1.default.findByIdAndDelete(bookTextId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book text not found");
    }
    return result;
});
exports.BookTextService = {
    createBookText,
    getAllBookTexts,
    getSingleBookText,
    getBookTextByDetails,
    updateBookText,
    deleteBookText,
};
