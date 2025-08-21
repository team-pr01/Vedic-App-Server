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
exports.ReligiousTextControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const religiousTexts_services_1 = require("./religiousTexts.services");
// Create ReligiousText
const createReligiousText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const textData = req.body;
    const result = yield religiousTexts_services_1.ReligiousTextServices.createReligiousText(textData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Religious text created successfully",
        data: result,
    });
}));
// Get All ReligiousTexts (filtered by vedaName, searched by originalText)
const getAllReligiousTexts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vedaName, keyword } = req.query;
    const result = yield religiousTexts_services_1.ReligiousTextServices.getAllReligiousTexts({ vedaName, keyword });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Religious texts fetched successfully",
        data: result,
    });
}));
// Get Single ReligiousText by ID
const getReligiousTextById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield religiousTexts_services_1.ReligiousTextServices.getReligiousTextById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Religious text fetched successfully",
        data: result,
    });
}));
// Update ReligiousText by ID
const updateReligiousText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield religiousTexts_services_1.ReligiousTextServices.updateReligiousText(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Religious text updated successfully",
        data: result,
    });
}));
// Delete ReligiousText by ID
const deleteReligiousText = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield religiousTexts_services_1.ReligiousTextServices.deleteReligiousText(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Religious text deleted successfully",
        data: result,
    });
}));
exports.ReligiousTextControllers = {
    createReligiousText,
    getAllReligiousTexts,
    getReligiousTextById,
    updateReligiousText,
    deleteReligiousText,
};
