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
exports.BulkSmsServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("../auth/auth.model");
const sendEmail_1 = require("../../utils/sendEmail");
const sendBulkEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { targetedAudience, subject, message } = payload;
        let users;
        const now = new Date();
        const days30Ago = new Date(now);
        days30Ago.setDate(now.getDate() - 30);
        if (targetedAudience === "all") {
            users = yield auth_model_1.User.find({});
        }
        else if (targetedAudience === "active") {
            users = yield auth_model_1.User.find({
                lastLoggedIn: { $gte: days30Ago },
            });
        }
        else if (targetedAudience === "inactive") {
            users = yield auth_model_1.User.find({
                $or: [
                    { lastLoggedIn: { $lt: days30Ago } },
                    { lastLoggedIn: { $exists: false } },
                ],
            });
        }
        if (!users || users.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No users found for this audience");
        }
        const batchSize = 50;
        for (let i = 0; i < users.length; i += batchSize) {
            const batch = users.slice(i, i + batchSize);
            yield Promise.all(batch.map((user) => (0, sendEmail_1.sendEmail)(user.email, message, subject)));
        }
        return {
            success: true,
            message: `Bulk email sent to ${users.length} users successfully`,
        };
    }
    catch (error) {
        console.error("Bulk email error:", error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message || "Failed to send bulk email");
    }
});
exports.BulkSmsServices = {
    sendBulkEmail,
};
