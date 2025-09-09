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
exports.AyurvedaControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const ayurveda_services_1 = require("./ayurveda.services");
// Add Ayurveda
const addAyurveda = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield ayurveda_services_1.AyurvedaServices.addAyurveda(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Ayurveda item added successfully",
        data: result,
    });
}));
// Get all Ayurveda
const getAllAyurveda = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, category } = req.query;
    const result = yield ayurveda_services_1.AyurvedaServices.getAllAyurveda(keyword, category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Ayurveda items fetched successfully.",
        data: result,
    });
}));
// Get single Ayurveda by id
const getSingleAyurvedaById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ayurvedaId } = req.params;
    const result = yield ayurveda_services_1.AyurvedaServices.getSingleAyurvedaById(ayurvedaId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Ayurveda item fetched successfully.",
        data: result,
    });
}));
// Update Ayurveda
const updateAyurveda = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ayurvedaId } = req.params;
    const result = yield ayurveda_services_1.AyurvedaServices.updateAyurveda(ayurvedaId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Ayurveda item updated successfully",
        data: result,
    });
}));
// Delete Ayurveda
const deleteAyurveda = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ayurvedaId } = req.params;
    const result = yield ayurveda_services_1.AyurvedaServices.deleteAyurveda(ayurvedaId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Ayurveda item deleted successfully",
        data: result,
    });
}));
exports.AyurvedaControllers = {
    addAyurveda,
    getAllAyurveda,
    getSingleAyurvedaById,
    updateAyurveda,
    deleteAyurveda,
};
