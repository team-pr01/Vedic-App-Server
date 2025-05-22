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
exports.EmergencyServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const emergency_model_1 = __importDefault(require("./emergency.model"));
const emergency_model_2 = __importDefault(require("./emergency.model"));
// Create emergency post
const postEmergency = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, message, location } = payload;
    // const imageUrls: string[] = [];
    // if (files && files.length > 0) {
    //   for (const file of files) {
    //     const imageName = `${name}-${Date.now()}`;
    //     const path = file.path;
    //     const { secure_url } = await sendImageToCloudinary(imageName, path);
    //     imageUrls.push(secure_url);
    //   }
    // }
    const payloadData = {
        user,
        message,
        location
    };
    const result = yield emergency_model_1.default.create(payloadData);
    return result;
});
// Get all emergency posts with search and filter by status
const getAllEmergencyPosts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, status } = query;
    const filter = {};
    if (keyword) {
        filter.message = { $regex: keyword, $options: "i" };
    }
    if (status) {
        filter.status = status;
    }
    const result = yield emergency_model_1.default.find(filter).populate("user");
    return result;
});
// Get single emergency post by id
const getSingleEmergencyPostById = (emergencyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emergency_model_1.default.findById(emergencyId).populate("user");
    return result;
});
// Change emergency post status
const changeEmergencyPostStatus = (emergencyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const emergencyPost = yield emergency_model_1.default.findById(emergencyId);
    if (!emergencyPost) {
        throw new Error('Emergency post not found');
    }
    emergencyPost.status = status;
    yield emergencyPost.save();
    return emergencyPost;
});
// Update emergency post
const updateEmergencyPost = (emergencyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const existingPost = yield emergency_model_1.default.findById(emergencyId);
    if (!existingPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Emergency post not found");
    }
    const result = yield emergency_model_1.default.findByIdAndUpdate(emergencyId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete product by id
const deleteEmergencyPost = (emergencyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield emergency_model_2.default.findByIdAndDelete(emergencyId);
    return result;
});
exports.EmergencyServices = {
    postEmergency,
    getAllEmergencyPosts,
    getSingleEmergencyPostById,
    updateEmergencyPost,
    changeEmergencyPostStatus,
    deleteEmergencyPost,
};
