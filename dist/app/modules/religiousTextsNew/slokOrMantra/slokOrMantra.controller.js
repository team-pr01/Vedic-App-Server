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
exports.SlokOrMantraController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const slokOrMantra_services_1 = require("./slokOrMantra.services");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const createSlokOrMantra = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slokOrMantra_services_1.SlokOrMantraService.createSlokOrMantra(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Slok or Mantra created successfully",
        data: result,
    });
}));
const getAllSlokOrMantras = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slokOrMantra_services_1.SlokOrMantraService.getAllSlokOrMantras();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slok or Mantra list retrieved successfully",
        data: result,
    });
}));
const getSingleSlokOrMantra = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slokOrMantra_services_1.SlokOrMantraService.getSingleSlokOrMantra(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slok or Mantra retrieved successfully",
        data: result,
    });
}));
const updateSlokOrMantra = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slokOrMantra_services_1.SlokOrMantraService.updateSlokOrMantra(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slok or Mantra updated successfully",
        data: result,
    });
}));
const deleteSlokOrMantra = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield slokOrMantra_services_1.SlokOrMantraService.deleteSlokOrMantra(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slok or Mantra deleted successfully",
        data: result,
    });
}));
exports.SlokOrMantraController = {
    createSlokOrMantra,
    getAllSlokOrMantras,
    getSingleSlokOrMantra,
    updateSlokOrMantra,
    deleteSlokOrMantra,
};
