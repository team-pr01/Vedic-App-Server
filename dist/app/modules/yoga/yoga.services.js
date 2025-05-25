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
exports.YogaServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const yoga_model_1 = __importDefault(require("./yoga.model"));
// Add yoga for admin only
const addYoga = (payload, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, sanskritName, description, imageUrl, videoUrl, difficulty, duration, benefits, contraindications, categories, } = payload;
    const payloadData = {
        name,
        sanskritName,
        description,
        imageUrl,
        videoUrl,
        difficulty,
        duration,
        benefits,
        contraindications,
        categories,
        createdBy,
    };
    const result = yield yoga_model_1.default.create(payloadData);
    return result;
});
// Get all yogas
const getAllYogas = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield yoga_model_1.default.find();
    return result;
});
// Get single yoga post by id
const getSingleYogaById = (yogaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield yoga_model_1.default.findById(yogaId);
    return result;
});
// Update yoga
const updateYoga = (yogaId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield yoga_model_1.default.findById(yogaId);
    if (!existingPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Yoga not found");
    }
    const result = yield yoga_model_1.default.findByIdAndUpdate(yogaId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete yoga by id
const deleteYoga = (yogaId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield yoga_model_1.default.findByIdAndDelete(yogaId);
    return result;
});
exports.YogaServices = {
    addYoga,
    getAllYogas,
    getSingleYogaById,
    updateYoga,
    deleteYoga,
};
