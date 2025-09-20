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
exports.DonationService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const donation_model_1 = __importDefault(require("./donation.model"));
const auth_model_1 = require("../auth/auth.model");
const donationPrograms_model_1 = __importDefault(require("../donationPrograms/donationPrograms.model"));
const donate = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = "";
    // get logged-in user data
    const userData = yield auth_model_1.User.findById(user.userId);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // handle optional image upload
    if (file) {
        const imageName = `${payload.userName || "donor"}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const donationData = Object.assign(Object.assign({}, payload), { imageUrl, userName: userData.name, userPhoneNumber: userData.phoneNumber, userEmail: userData.email, userId: userData._id });
    const result = yield donation_model_1.default.create(donationData);
    if (payload.donationProgramId && payload.amount) {
        const program = yield donationPrograms_model_1.default.findById(payload.donationProgramId);
        if (!program) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Donation program not found");
        }
        const currentAmount = Number(program.amountRaised) || 0;
        const newAmount = Number(payload.amount) || 0;
        program.amountRaised = String(currentAmount + newAmount);
        yield program.save();
    }
    return result;
});
// Get all donations
const getAllDonations = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { userName: { $regex: keyword, $options: "i" } },
            { userPhoneNumber: { $regex: keyword, $options: "i" } },
            { userEmail: { $regex: keyword, $options: "i" } },
            { donationProgramId: { $regex: keyword, $options: "i" } },
            { donationProgramTitle: { $regex: keyword, $options: "i" } }
        ];
    }
    const result = yield donation_model_1.default.find(query).sort({ createdAt: -1 });
    return result;
});
// Get single donation by ID
const getSingleDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Donation not found");
    }
    return result;
});
// Delete donation
const deleteDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Donation not found");
    }
    return result;
});
exports.DonationService = {
    donate,
    getAllDonations,
    getSingleDonation,
    deleteDonation,
};
