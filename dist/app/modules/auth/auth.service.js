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
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
// import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
const auth_model_1 = require("./auth.model");
const sendEmail_1 = require("../../utils/sendEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create user
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password, role } = payload;
    // if (file && file.path) {
    //   const imageName = `${name}-${email}`;
    //   const path = file.path;
    //   const { secure_url } = await sendImageToCloudinary(imageName, path);
    //   payload.avatar = secure_url;
    // }
    const payloadData = {
        name,
        email,
        password,
        phoneNumber: phoneNumber || "",
        role: role || "user",
        isDeleted: false,
        isSuspended: false,
        isVerified: false,
    };
    // Checking if user already exists
    const isUserExists = yield auth_model_1.User.findOne({ email: payloadData.email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User already exists.");
    }
    // Create user in the database
    const result = yield auth_model_1.User.create(payloadData);
    return result;
});
// Login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists or not
    const user = yield auth_model_1.User.isUserExists(payload.email);
    if (!(yield user)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exists.");
    }
    // Check if the user already deleted or not
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exists.");
    }
    // Check if the user suspended or not
    const isUserSuspended = user === null || user === void 0 ? void 0 : user.isSuspended;
    if (isUserSuspended) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are suspended!");
    }
    // Check if the password is correct or not
    if (!(yield auth_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password is not correct.");
    }
    console.log(user);
    // Create token and send to client/user
    const jwtPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        assignedPages: user.assignedPages || [],
    };
    const accessToken = (0, auth_utils_1.createToekn)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToekn)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    // Access the user into his account.
    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            assignedPages: user.assignedPages || [],
        },
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if there is any token sent from the client or not.
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to proceed!");
    }
    // Check if the token is valid or not.
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield auth_model_1.User.isUserExists(email);
    // Checking if the user exists or not
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // Checking if the user is deleted or not
    // Have to check if the user is suspended or not
    const jwtpayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToekn)(jwtpayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.isUserExists(email);
    // Checking if the user exists or not
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const jwtpayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const resetToken = (0, auth_utils_1.createToekn)(jwtpayload, config_1.default.jwt_access_secret, "10m");
    const resetLink = `${config_1.default.reset_password_ui_url}/reset-password?email=${user === null || user === void 0 ? void 0 : user.email}&token=${resetToken}`;
    yield (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetLink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.isUserExists(payload === null || payload === void 0 ? void 0 : payload.email);
    // Checking if the user exists or not
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // Check if the token is valid or not.
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if ((payload === null || payload === void 0 ? void 0 : payload.email) !== (decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are forbidden");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    yield auth_model_1.User.findOneAndUpdate({
        email: decoded.email,
        role: decoded.role,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
});
// Change user role (For admin)
const changeUserRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield auth_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.userId, { role: payload === null || payload === void 0 ? void 0 : payload.role }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const assignPagesToUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(payload.userId, { assignedPages: payload.pages }, { new: true, runValidators: true });
    return result;
});
exports.AuthServices = {
    signup,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
    changeUserRole,
    assignPagesToUser,
};
