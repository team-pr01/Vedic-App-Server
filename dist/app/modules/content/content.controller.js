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
exports.ContentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const content_services_1 = require("./content.services");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_services_1.ContentService.createContent(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Content created successfully",
        data: result,
    });
}));
const getAllContents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_services_1.ContentService.getAllContents();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Contents retrieved successfully",
        data: result,
    });
}));
const getSingleContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_services_1.ContentService.getSingleContent(req.params.contentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Content retrieved successfully",
        data: result,
    });
}));
const updateContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_services_1.ContentService.updateContent(req.params.contentId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Content updated successfully",
        data: result,
    });
}));
const deleteContent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, type, url } = req.params;
    // Validate type
    if (!['image', 'video'].includes(type)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid media type");
    }
    if (!url) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "URL is required");
    }
    const result = yield content_services_1.ContentService.deleteContent(contentId, type, url);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${type} URL removed successfully`,
        data: result,
    });
}));
exports.ContentController = {
    createContent,
    getAllContents,
    getSingleContent,
    updateContent,
    deleteContent,
};
