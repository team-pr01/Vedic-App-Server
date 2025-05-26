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
exports.TempleServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const temples_model_1 = __importDefault(require("./temples.model"));
// Add temple for admin only
const addTemple = (payload, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mainDeity, description, address, city, state, country, establishedYear, visitingHours, contactInfo, imageUrl, mediaGallery, videoUrl, } = payload;
    const payloadData = {
        name,
        mainDeity,
        description,
        address,
        city,
        state,
        country,
        establishedYear,
        visitingHours,
        contactInfo,
        events: [],
        imageUrl,
        mediaGallery,
        videoUrl,
        createdBy,
    };
    const result = yield temples_model_1.default.create(payloadData);
    return result;
});
// Get all temples
const getAllTemples = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield temples_model_1.default.find();
    return result;
});
// Get single temple post by id
const getSingleTempleById = (templeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield temples_model_1.default.findById(templeId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Temple not found");
    }
    return result;
});
// Update temple
const updateTemple = (templeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTemple = yield temples_model_1.default.findById(templeId);
    if (!existingTemple) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Temple not found");
    }
    const result = yield temples_model_1.default.findByIdAndUpdate(templeId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete temple by id
const deleteTemple = (templeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield temples_model_1.default.findByIdAndDelete(templeId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Temple not found");
    }
    return result;
});
// Add event to a temple
const addEventToTemple = (templeId, eventData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const temple = yield temples_model_1.default.findById(templeId);
    if (!temple) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Temple not found");
    }
    (_a = temple === null || temple === void 0 ? void 0 : temple.events) === null || _a === void 0 ? void 0 : _a.push(eventData);
    yield temple.save();
    return temple;
});
// Delete event from a temple
const deleteEventFromTemple = (templeId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const temple = yield temples_model_1.default.findById(templeId);
    if (!temple) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Temple not found");
    }
    temple.events = (_a = temple === null || temple === void 0 ? void 0 : temple.events) === null || _a === void 0 ? void 0 : _a.filter((event) => event._id.toString() !== eventId);
    yield temple.save();
    return temple;
});
exports.TempleServices = {
    addTemple,
    getAllTemples,
    getSingleTempleById,
    updateTemple,
    deleteTemple,
    addEventToTemple,
    deleteEventFromTemple,
};
