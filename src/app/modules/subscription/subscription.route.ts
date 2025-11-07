import express from "express";
import { SubscriptionController } from "./subscription.controller";
import auth from "../../middlewares/auth";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

router.post(
  "/subscribe",
  auth(
    UserRole.admin,
    UserRole.moderator,
    UserRole["super-admin"],
    UserRole.user,
    UserRole.temple
  ),
  authorizeRoute(),
  SubscriptionController.subscribe
);

router.put(
  "/mark-user-as-subscribed",
  auth(
    UserRole.admin,
    UserRole.moderator,
    UserRole["super-admin"]
  ),
  authorizeRoute(),
  SubscriptionController.makeUserAsSubscribed
);

router.get(
  "/",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  SubscriptionController.getAllSubscriptions
);

router.get(
  "/:subscriptionId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  SubscriptionController.getSingleSubscription
);

router.delete(
  "/delete/:subscriptionId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  SubscriptionController.deleteSubscription
);

export const SubscriptionRoutes = router;