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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../auth/auth.model");
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.find();
    return result;
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(userId);
    return result;
});
const getMyOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId).populate('orders');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user.orders;
});
// const updateProfile = async (id: string, payload: Partial<TUser>, profilePic: any) => {
//   let profilePicUrl: string | undefined;
//   if (profilePic) {
//     const imageName = `${id}-profile-${Date.now()}`;
//     const path = profilePic.path;
//     const { secure_url } = await sendImageToCloudinary(imageName, path);
//     profilePicUrl = secure_url;
//   }
//   if (profilePicUrl) {
//     payload.profilePicture = profilePicUrl;
//   }
//   const result = await User.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };
const changeUserRoleToAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = 'admin';
    yield user.save();
    return user;
});
const changeUserRoleToUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = 'user';
    yield user.save();
    return user;
});
const suspendUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.isSuspended = true;
    yield user.save();
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findByIdAndDelete(id);
    return result;
});
const getSingleUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.User.findById(userId);
    return result;
});
const followUser = (currentUserId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findByIdAndUpdate(currentUserId, { $addToSet: { following: userId } }, { new: true });
    const targetUser = yield auth_model_1.User.findByIdAndUpdate(userId, { $addToSet: { followers: currentUserId } }, { new: true });
    return { user, targetUser };
});
const unfollowUser = (currentUserId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findByIdAndUpdate(currentUserId, { $pull: { following: { userId: userId } } }, { new: true });
    const targetUser = yield auth_model_1.User.findByIdAndUpdate(userId, { $pull: { followers: { userId: currentUserId } } }, { new: true });
    return { user, targetUser };
});
exports.UserServices = {
    getAllUser,
    getMe,
    deleteUser,
    changeUserRoleToAdmin,
    changeUserRoleToUser,
    suspendUser,
    getSingleUserById,
    followUser,
    unfollowUser,
    getMyOrders,
};
