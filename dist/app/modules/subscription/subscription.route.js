"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("./subscription.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const authorizeRoute_1 = __importDefault(require("../../middlewares/authorizeRoute"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
router.post("/subscribe", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"], auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.temple), subscription_controller_1.SubscriptionController.subscribe);
router.put("/mark-user-as-subscribed", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), subscription_controller_1.SubscriptionController.makeUserAsSubscribed);
router.put("/mark-user-as-unsubscribed", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), subscription_controller_1.SubscriptionController.makeUserAsUnSubscribed);
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), subscription_controller_1.SubscriptionController.getAllSubscriptions);
router.get("/:subscriptionId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), subscription_controller_1.SubscriptionController.getSingleSubscription);
router.delete("/delete/:subscriptionId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), subscription_controller_1.SubscriptionController.deleteSubscription);
exports.SubscriptionRoutes = router;
