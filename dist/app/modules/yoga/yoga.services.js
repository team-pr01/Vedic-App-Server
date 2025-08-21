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
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const yoga_model_1 = __importDefault(require("./yoga.model"));
const emergency_model_1 = __importDefault(require("../emergency/emergency.model"));
const auth_model_1 = require("../auth/auth.model");
const book_model_1 = __importDefault(require("../religiousTextsNew/book/book.model"));
const organizations_model_1 = __importDefault(require("../organizations/organizations.model"));
const course_model_1 = __importDefault(require("../course/course.model"));
const reels_model_1 = __importDefault(require("../reels/reels.model"));
const vastu_model_1 = __importDefault(require("../vastu/vastu.model"));
const temples_model_1 = __importDefault(require("../temples/temples.model"));
const consultancyService_model_1 = __importDefault(require("../consultancyService/consultancyService.model"));
const recipe_model_1 = __importDefault(require("../recipe/recipe.model"));
const apiKeys_model_1 = __importDefault(require("../apiKeys/apiKeys.model"));
// Add yoga for admin only
const addYoga = (payload, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, sanskritName, description, videoUrl, difficulty, duration, benefits, contraindications, categories, } = payload;
    const payloadData = {
        name,
        sanskritName,
        description,
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
const getAllYogas = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (keyword) {
        filter.name = { $regex: keyword, $options: "i" };
    }
    const result = yield yoga_model_1.default.find();
    return result;
});
// Get admin stats
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const [pendingEmergencies, totalUsers, totalBooks, totalOrganizations, totalCourses, totalReels, totalYogas, totalVastus, totalTemples, totalConsultancies, totalRecipes, totalApiKeys,] = yield Promise.all([
        emergency_model_1.default.countDocuments({ status: 'pending' }),
        auth_model_1.User.countDocuments(),
        book_model_1.default.countDocuments(),
        organizations_model_1.default.countDocuments(),
        course_model_1.default.countDocuments(),
        reels_model_1.default.countDocuments(),
        yoga_model_1.default.countDocuments(),
        vastu_model_1.default.countDocuments(),
        temples_model_1.default.countDocuments(),
        consultancyService_model_1.default.countDocuments(),
        recipe_model_1.default.countDocuments(),
        apiKeys_model_1.default.countDocuments(),
    ]);
    return {
        pendingEmergencies,
        totalUsers,
        totalBooks,
        totalOrganizations,
        totalCourses,
        totalReels,
        totalYogas,
        totalVastus,
        totalTemples,
        totalConsultancies,
        totalRecipes,
        totalApiKeys,
    };
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
    getAdminStats,
};
