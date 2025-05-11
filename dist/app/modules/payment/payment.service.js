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
exports.PaymentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const auth_model_1 = require("../auth/auth.model");
const cart_model_1 = __importDefault(require("../cart/cart.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const payment_utils_1 = require("./payment.utils");
// Get all payments
const getAllPaymentHistories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.default.find();
    return result;
});
// Make payment
const payment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = `TNX-${Date.now()}-${payload.email}`;
    // Create a new payment record
    const payment = new payment_model_1.default({
        sellerIds: payload.sellerIds,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        userId: payload.userId,
        amount: payload.amount,
        address: payload.address,
        streetAddress: payload.streetAddress,
        country: payload.country,
        state: payload.state,
        zipCode: payload.zipCode,
        altPhoneNumber: payload.altPhoneNumber,
        transactionId,
        status: "pending"
    });
    yield payment.save();
    yield auth_model_1.User.findByIdAndUpdate(payload.userId, {
        $push: { orders: { $each: payload.productIds } },
    }, { new: true });
    // Empty the user's cart
    yield cart_model_1.default.findOneAndUpdate({ userId: payload.userId }, { $set: { items: [] } }, { new: true });
    const paymentData = {
        transactionId,
        amount: payload.amount,
        sellerIds: payload.sellerIds,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        userId: payload.userId,
        address: payload.address,
        streetAddress: payload.streetAddress,
        country: payload.country,
        state: payload.state,
        zipCode: payload.zipCode,
        altPhoneNumber: payload.altPhoneNumber,
        status: "pending"
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
    return paymentSession;
});
// Payment confirmation message
const paymentConfirmation = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifypayment)(transactionId);
    console.log(verifyResponse);
    let result;
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        result = yield auth_model_1.User.findOneAndUpdate({ transactionId }, {
            isVerified: true,
        });
    }
    return `<h1>Payment ${status}</h1>`;
});
const getPaymentsBySellerId = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.default.find({ sellerIds: sellerId });
    return result;
});
exports.PaymentServices = {
    payment,
    paymentConfirmation,
    getAllPaymentHistories,
    getPaymentsBySellerId,
};
