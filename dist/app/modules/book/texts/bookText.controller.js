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
exports.BookTextController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const bookText_services_1 = require("./bookText.services");
const createBookText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookText_services_1.BookTextService.createBookText(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Book text created successfully",
        data: result,
    });
}));
const getAllBookTexts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    const result = yield bookText_services_1.BookTextService.getAllBookTexts(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book texts retrieved successfully",
        data: result,
    });
}));
const getSingleBookText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookTextId } = req.params;
    const result = yield bookText_services_1.BookTextService.getSingleBookText(bookTextId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book text retrieved successfully",
        data: result,
    });
}));
const getBookTextByDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, chapter, verseNumber } = req.query;
    const result = yield bookText_services_1.BookTextService.getBookTextByDetails(bookId, chapter, verseNumber);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book text fetched successfully",
        data: result,
    });
}));
const updateBookText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookTextId } = req.params;
    const result = yield bookText_services_1.BookTextService.updateBookText(bookTextId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book text updated successfully",
        data: result,
    });
}));
const deleteBookText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookTextId } = req.params;
    const result = yield bookText_services_1.BookTextService.deleteBookText(bookTextId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book text deleted successfully",
        data: result,
    });
}));
exports.BookTextController = {
    createBookText,
    getAllBookTexts,
    getSingleBookText,
    getBookTextByDetails,
    updateBookText,
    deleteBookText,
};
