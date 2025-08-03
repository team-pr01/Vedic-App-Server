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
exports.TempleControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const temples_services_1 = require("./temples.services");
// Add temple (For admin)
const addTemple = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield temples_services_1.TempleServices.addTemple(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temple added successfully",
        data: result,
    });
}));
// Get all temples
const getAllTemples = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    const result = yield temples_services_1.TempleServices.getAllTemples(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temples fetched successfully.",
        data: result,
    });
}));
// Get single temple by id
const getSingleTempleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId } = req.params;
    const result = yield temples_services_1.TempleServices.getSingleTempleById(templeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temple fetched successfully.",
        data: result,
    });
}));
// Update temple
const updateTemple = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId } = req.params;
    const result = yield temples_services_1.TempleServices.updateTemple(templeId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temple details updated successfully",
        data: result,
    });
}));
const updateTempleStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId } = req.params;
    const result = yield temples_services_1.TempleServices.updateTempleStatus(templeId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temple status updated successfully",
        data: result,
    });
}));
// Delete temple by id
const deleteTemple = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId } = req.params;
    const result = yield temples_services_1.TempleServices.deleteTemple(templeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Temple deleted successfully",
        data: result,
    });
}));
// Add a new event to a specific temple
const addEventToTemple = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId } = req.params;
    const result = yield temples_services_1.TempleServices.addEventToTemple(templeId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event added to temple successfully",
        data: result,
    });
}));
// Delete a specific event from a temple
const deleteEventFromTemple = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { templeId, eventId } = req.params;
    const result = yield temples_services_1.TempleServices.deleteEventFromTemple(templeId, eventId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Event deleted from temple successfully",
        data: result,
    });
}));
exports.TempleControllers = {
    addTemple,
    getAllTemples,
    getSingleTempleById,
    updateTemple,
    updateTempleStatus,
    deleteTemple,
    addEventToTemple,
    deleteEventFromTemple,
};
