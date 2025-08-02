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
exports.VastuServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const vastu_model_1 = __importDefault(require("./vastu.model"));
// Add vastu for (admin only)
const addVastu = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, videoUrl } = payload;
    const payloadData = {
        title,
        category,
        videoUrl,
    };
    const result = yield vastu_model_1.default.create(payloadData);
    return result;
});
// Get all vastus
const getAllVastus = (category, keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
        ];
    }
    if (category) {
        query.category = { $regex: category, $options: "i" };
    }
    const result = yield vastu_model_1.default.find(query);
    return result;
});
// Get single vastu post by id
const getSingleVastuById = (vastuId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vastu_model_1.default.findById(vastuId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Vastu not found");
    }
    return result;
});
// Update vastu
const updateVastu = (vastuId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield vastu_model_1.default.findById(vastuId);
    if (!existingPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Vastu not found");
    }
    const result = yield vastu_model_1.default.findByIdAndUpdate(vastuId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete vastu by id
const deleteVastu = (vastuId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vastu_model_1.default.findByIdAndDelete(vastuId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Vastu not found");
    }
    return result;
});
exports.VastuServices = {
    addVastu,
    getAllVastus,
    getSingleVastuById,
    updateVastu,
    deleteVastu,
};
