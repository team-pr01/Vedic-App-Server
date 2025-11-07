/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Subscription from "./subscription.model";
import { TSubscription } from "./subscription.interface";
import { User } from "../auth/auth.model";

const subscribe = async (payload: TSubscription, user: any) => {
  const userData = await User.findById(user.userId);
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if user already has an active subscription with the same plan name
  const existingSubscription = await Subscription.findOne({
    userId: userData._id,
    subscriptionPlanName: payload.subscriptionPlanName,
    endDate: { $gt: new Date() },
  });

  if (existingSubscription) {
    throw new AppError(
      httpStatus.CONFLICT,
      `You already have an active subscription for "${payload.subscriptionPlanName}" plan`
    );
  }

  const endDate = new Date();

  if (payload.subscriptionPlanName.toLowerCase().includes("month")) {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (payload.subscriptionPlanName.toLowerCase().includes("year")) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const subscriptionData = {
    ...payload,
    userId: userData._id,
    endDate: endDate,
  };

  const result = await Subscription.create(subscriptionData);

  return result;
};

// Get all subscriptions
const getAllSubscriptions = async (keyword?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { subscriptionPlanName: { $regex: keyword, $options: "i" } }
    ];
  }

  const result = await Subscription.find(query)
    .populate("userId")
    .sort({ createdAt: -1 });
  return result;
};

// Get single subscription by ID
const getSingleSubscription = async (id: string) => {
  const result = await Subscription.findById(id)
    .populate("subscriptionPlanId")
    .populate("userId");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
  }
  return result;
};

// Delete subscription
const deleteSubscription = async (id: string) => {
  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new AppError(httpStatus.NOT_FOUND, "Subscription not found");
  }

  const result = await Subscription.findByIdAndDelete(id);
  return result;
};

export const SubscriptionService = {
  subscribe,
  getAllSubscriptions,
  getSingleSubscription,
  deleteSubscription,
};
