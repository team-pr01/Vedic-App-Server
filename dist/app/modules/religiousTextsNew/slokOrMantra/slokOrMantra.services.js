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
exports.SlokOrMantraService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const slokOrMantra_model_1 = __importDefault(require("./slokOrMantra.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const createSlokOrMantra = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slokOrMantra_model_1.default.create(payload);
    return result;
});
const getAllSlokOrMantras = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield slokOrMantra_model_1.default.find();
});
const getSingleSlokOrMantra = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield slokOrMantra_model_1.default.findById(id);
    if (!item) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slok or Mantra not found");
    }
    return item;
});
const updateSlokOrMantra = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield slokOrMantra_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!item) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slok or Mantra not found");
    }
    return item;
});
const deleteSlokOrMantra = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield slokOrMantra_model_1.default.findByIdAndDelete(id);
    if (!deletedItem) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slok or Mantra not found");
    }
    return deletedItem;
});
exports.SlokOrMantraService = {
    createSlokOrMantra,
    getAllSlokOrMantras,
    getSingleSlokOrMantra,
    updateSlokOrMantra,
    deleteSlokOrMantra,
};
