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
exports.ConsultationServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const consultations_model_1 = __importDefault(require("./consultations.model"));
// Book a consultation
const bookConsultation = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadData = Object.assign(Object.assign({}, payload), { userId, status: "pending" });
    const result = yield consultations_model_1.default.create(payloadData);
    return result;
});
// Get all consultations (admin)
const getAllConsultations = (keyword, status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { expertName: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
        ];
    }
    if (status) {
        query.status = status;
    }
    const result = yield consultations_model_1.default.find(query)
        .populate("userId", "name email phoneNumber") // populate user
        .populate("consultantId", "name email phoneNumber"); // populate consultant
    return result;
});
// Get single consultation by id
const getSingleConsultationById = (consultationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.findById(consultationId).populate("userId", "name email phoneNumber").populate("consultantId", "name email phoneNumber");
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    return result;
});
// Get my consultations (logged-in user)
const getMyConsultations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.find({ user: userId });
    return result;
});
const scheduleConsultation = (consultationId, scheduledAt) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield consultations_model_1.default.findById(consultationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    existing.scheduledAt = new Date(scheduledAt);
    yield existing.save();
    // Populate user and consultant for consistency
    const result = yield consultations_model_1.default.findById(consultationId)
        .populate("userId", "name email phoneNumber")
        .populate("consultantId", "name email phoneNumber");
    return result;
});
// Update consultation status (admin)
const updateConsultationStatus = (consultationId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield consultations_model_1.default.findById(consultationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    const result = yield consultations_model_1.default.findByIdAndUpdate(consultationId, { status }, { new: true, runValidators: true });
    return result;
});
// Delete consultation
const deleteConsultation = (consultationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.findByIdAndDelete(consultationId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    return result;
});
exports.ConsultationServices = {
    bookConsultation,
    getAllConsultations,
    getSingleConsultationById,
    getMyConsultations,
    scheduleConsultation,
    updateConsultationStatus,
    deleteConsultation,
};
