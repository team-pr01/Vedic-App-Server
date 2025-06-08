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
exports.PopupServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const popup_model_1 = __importDefault(require("./popup.model"));
// Create Popup
const createPopup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield popup_model_1.default.create(payload);
    return result;
});
// Get All Popups (with optional title search)
const getAllPopups = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (keyword) {
        filter.title = { $regex: keyword, $options: "i" };
    }
    const result = yield popup_model_1.default.find(filter);
    return result;
});
// Get Single Popup by ID
const getPopupById = (popupId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield popup_model_1.default.findById(popupId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Popup not found");
    }
    return result;
});
// Update Popup
const updatePopup = (popupId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield popup_model_1.default.findById(popupId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Popup not found");
    }
    const result = yield popup_model_1.default.findByIdAndUpdate(popupId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Popup
const deletePopup = (popupId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield popup_model_1.default.findById(popupId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Popup not found");
    }
    return yield popup_model_1.default.findByIdAndDelete(popupId);
});
exports.PopupServices = {
    createPopup,
    getAllPopups,
    getPopupById,
    updatePopup,
    deletePopup,
};
