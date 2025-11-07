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
exports.SubscriptionService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const subscription_model_1 = __importDefault(require("./subscription.model"));
const auth_model_1 = require("../auth/auth.model");
const subscribe = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield auth_model_1.User.findById(user.userId);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check if user already has an active subscription with the same plan name
    const existingSubscription = yield subscription_model_1.default.findOne({
        userId: userData._id,
        subscriptionPlanName: payload.subscriptionPlanName,
        endDate: { $gt: new Date() },
    });
    if (existingSubscription) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `You already have an active subscription for "${payload.subscriptionPlanName}" plan`);
    }
    const endDate = new Date();
    if (payload.subscriptionPlanName.toLowerCase().includes("month")) {
        endDate.setMonth(endDate.getMonth() + 1);
    }
    else if (payload.subscriptionPlanName.toLowerCase().includes("year")) {
        endDate.setFullYear(endDate.getFullYear() + 1);
    }
    const subscriptionData = Object.assign(Object.assign({}, payload), { userId: userData._id, endDate: endDate });
    const result = yield subscription_model_1.default.create(subscriptionData);
    return result;
});
// Get all subscriptions
const getAllSubscriptions = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [{ subscriptionPlanName: { $regex: keyword, $options: "i" } }];
    }
    const result = yield subscription_model_1.default.find(query)
        .populate("userId")
        .sort({ createdAt: -1 });
    return result;
});
// Get single subscription by ID
const getSingleSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield subscription_model_1.default.findById(id)
        .populate("subscriptionPlanId")
        .populate("userId");
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Subscription not found");
    }
    return result;
});
// Delete subscription
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield subscription_model_1.default.findById(id);
    if (!subscription) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Subscription not found");
    }
    const result = yield subscription_model_1.default.findByIdAndDelete(id);
    return result;
});
const makeUserAsSubscribed = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    yield auth_model_1.User.findByIdAndUpdate(payload.userId, {
        status: "active",
        isPaid: true,
        subscribedPlanName: payload.subscriptionPlanName,
    }, {
        new: true,
        runValidators: false,
    });
    const updatedSubscription = yield subscription_model_1.default.findByIdAndUpdate(payload.subscriptionId, {
        status: "active",
    }, {
        new: true,
        runValidators: false,
    });
    return updatedSubscription;
});
const makeUserAsUnSubscribed = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    yield auth_model_1.User.findByIdAndUpdate(payload.userId, {
        isPaid: false,
        subscribedPlanName: null,
    }, {
        new: true,
        runValidators: false,
    });
    const updatedSubscription = yield subscription_model_1.default.findByIdAndUpdate(payload.subscriptionId, {
        status: "expired",
    }, {
        new: true,
        runValidators: false,
    });
    return updatedSubscription;
});
exports.SubscriptionService = {
    subscribe,
    getAllSubscriptions,
    getSingleSubscription,
    deleteSubscription,
    makeUserAsSubscribed,
    makeUserAsUnSubscribed,
};
