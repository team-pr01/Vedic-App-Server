"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.get("/", payment_controller_1.PaymentControllers.getAllPaymentHistories);
router.post("/create-payment", payment_controller_1.PaymentControllers.payment);
router.post("/payment-success", payment_controller_1.PaymentControllers.paymentConfirmationMessage);
router.get("/:sellerId", payment_controller_1.PaymentControllers.getPaymentsBySellerId);
exports.PaymentRoutes = router;
