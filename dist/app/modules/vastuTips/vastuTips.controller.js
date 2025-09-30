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
exports.VastuTipsControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const vastuTips_services_1 = require("./vastuTips.services");
// Add Vastu Tip
const addVastuTip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield vastuTips_services_1.VastuTipsServices.addVastuTip(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu Tip added successfully",
        data: result,
    });
}));
// Get all Vastu Tips
const getAllVastuTips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, category } = req.query;
    const result = yield vastuTips_services_1.VastuTipsServices.getAllVastuTips(keyword, category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Vastu Tips fetched successfully",
        data: result,
    });
}));
// Get single Vastu Tip by ID
const getSingleVastuTipById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vastuTipId } = req.params;
    const result = yield vastuTips_services_1.VastuTipsServices.getSingleVastuTipById(vastuTipId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu Tip fetched successfully",
        data: result,
    });
}));
// Update Vastu Tip
const updateVastuTip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { vastuTipId } = req.params;
    const result = yield vastuTips_services_1.VastuTipsServices.updateVastuTip(vastuTipId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu Tip updated successfully",
        data: result,
    });
}));
// Delete Vastu Tip
const deleteVastuTip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vastuTipId } = req.params;
    const result = yield vastuTips_services_1.VastuTipsServices.deleteVastuTip(vastuTipId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vastu Tip deleted successfully",
        data: result,
    });
}));
exports.VastuTipsControllers = {
    addVastuTip,
    getAllVastuTips,
    getSingleVastuTipById,
    updateVastuTip,
    deleteVastuTip,
};
