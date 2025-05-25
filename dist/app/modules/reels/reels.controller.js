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
exports.ReelControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const reels_services_1 = require("./reels.services");
// Add reel (For admin)
const addReel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBy = req.user.userId;
    console.log(req.body);
    const result = yield reels_services_1.ReelServices.addReel(req.body, createdBy);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reel added successfully',
        data: result,
    });
}));
// Get all reels
const getAllReels = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reels_services_1.ReelServices.getAllReels();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reels fetched successfully.",
        data: result,
    });
}));
// Get single reel by id
const getSingleReelById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reelId } = req.params;
    const result = yield reels_services_1.ReelServices.getSingleReelById(reelId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reel fetched successfully.',
        data: result,
    });
}));
// Update reel
const updateReel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reelId } = req.params;
    const result = yield reels_services_1.ReelServices.updateReel(reelId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reel details updated successfully',
        data: result,
    });
}));
// Delete emergency post by id
const deleteReel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reelId } = req.params;
    const result = yield reels_services_1.ReelServices.deleteReel(reelId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reel deleted successfully',
        data: result,
    });
}));
exports.ReelControllers = {
    addReel,
    getAllReels,
    getSingleReelById,
    updateReel,
    deleteReel,
};
