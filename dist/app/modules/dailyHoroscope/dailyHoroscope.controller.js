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
exports.DailyHoroscopeControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dailyHoroscope_services_1 = require("./dailyHoroscope.services");
// Add Daily Horoscope
const addDailyHoroscope = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dailyHoroscope_services_1.DailyHoroscopeServices.addDailyHoroscope(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Daily horoscope added successfully",
        data: result,
    });
}));
// Get all Daily Horoscopes
const getAllDailyHoroscopes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query; // coming from query string
    const result = yield dailyHoroscope_services_1.DailyHoroscopeServices.getAllDailyHoroscopes(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Daily horoscopes fetched successfully",
        data: result,
    });
}));
// Get single Daily Horoscope by ID
const getSingleDailyHoroscopeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { horoscopeId } = req.params;
    const result = yield dailyHoroscope_services_1.DailyHoroscopeServices.getSingleDailyHoroscopeById(horoscopeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Daily horoscope fetched successfully",
        data: result,
    });
}));
// Update Daily Horoscope
const updateDailyHoroscope = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { horoscopeId } = req.params;
    const result = yield dailyHoroscope_services_1.DailyHoroscopeServices.updateDailyHoroscope(horoscopeId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Daily horoscope updated successfully",
        data: result,
    });
}));
// Delete Daily Horoscope
const deleteDailyHoroscope = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { horoscopeId } = req.params;
    const result = yield dailyHoroscope_services_1.DailyHoroscopeServices.deleteDailyHoroscope(horoscopeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Daily horoscope deleted successfully",
        data: result,
    });
}));
exports.DailyHoroscopeControllers = {
    addDailyHoroscope,
    getAllDailyHoroscopes,
    getSingleDailyHoroscopeById,
    updateDailyHoroscope,
    deleteDailyHoroscope,
};
