"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const emergency_model_1 = __importStar(require("./emergency.model"));
const emergency_model_2 = __importDefault(require("./emergency.model"));
// Send emergency message by admin
const sendEmergencyMessageAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, severity, targetGroups } = payload;
    const payloadData = {
        title,
        message,
        severity,
        targetGroups
    };
    const result = yield emergency_model_1.EmergencyMessageAdmin.create(payloadData);
    return result;
});
// Create emergency post (For user)
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
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Emergency post not found");
    }
    return result;
});
// Change emergency post status
const changeEmergencyPostStatus = (emergencyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const emergencyPost = yield emergency_model_1.default.findById(emergencyId);
    if (!emergencyPost) {
        throw new Error('Emergency post not found');
    }
    // Update status
    emergencyPost.status = status;
    if (status === "resolved") {
        emergencyPost.resolvedAt = new Date();
    }
    yield emergencyPost.save();
    return emergencyPost;
});
// Update emergency post
const updateEmergencyPost = (emergencyId, payload) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Emergency post not found");
    }
    return result;
});
exports.EmergencyServices = {
    sendEmergencyMessageAdmin,
    postEmergency,
    getAllEmergencyPosts,
    getSingleEmergencyPostById,
    updateEmergencyPost,
    changeEmergencyPostStatus,
    deleteEmergencyPost,
};
