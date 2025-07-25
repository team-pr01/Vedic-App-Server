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
exports.cleanupExpiredNotifications = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const notification_model_1 = __importDefault(require("../modules/notification/notification.model"));
const cleanupExpiredNotifications = () => {
    node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const now = new Date();
            yield notification_model_1.default.deleteMany({ endDate: { $lt: now } });
            console.log("Expired notifications cleaned up.");
        }
        catch (error) {
            console.error("Error deleting expired notifications:", error);
        }
    }));
};
exports.cleanupExpiredNotifications = cleanupExpiredNotifications;
