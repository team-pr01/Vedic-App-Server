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
exports.ApiKeyServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const apiKeys_model_1 = __importDefault(require("./apiKeys.model"));
// Add new API Key
const addApiKey = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield apiKeys_model_1.default.create(payload);
    return result;
});
// Get all API Keys
const getAllApiKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield apiKeys_model_1.default.find();
    return result;
});
// Delete API Key by ID
const deleteApiKey = (apiKeyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield apiKeys_model_1.default.findByIdAndDelete(apiKeyId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "API Key not found");
    }
    return result;
});
exports.ApiKeyServices = {
    addApiKey,
    getAllApiKeys,
    deleteApiKey,
};
