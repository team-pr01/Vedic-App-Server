import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubscriptionService } from "./subscription.services";

// Create a subscription
const subscribe = catchAsync(async (req, res) => {
  const result = await SubscriptionService.subscribe(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Subscription created successfully",
    data: result,
  });
});

// Get all subscriptions
const getAllSubscriptions = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const result = await SubscriptionService.getAllSubscriptions(keyword as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All subscriptions fetched successfully",
    data: result,
  });
});

// Get single subscription by ID
const getSingleSubscription = catchAsync(async (req, res) => {
  const { subscriptionId } = req.params;
  const result = await SubscriptionService.getSingleSubscription(subscriptionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription fetched successfully",
    data: result,
  });
});

// Delete subscription
const deleteSubscription = catchAsync(async (req, res) => {
  const { subscriptionId } = req.params;
  const result = await SubscriptionService.deleteSubscription(subscriptionId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription deleted successfully",
    data: result,
  });
});

// Mark user as subscribed
const makeUserAsSubscribed = catchAsync(async (req, res) => {
  const result = await SubscriptionService.makeUserAsSubscribed(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription deleted successfully",
    data: result,
  });
});

export const SubscriptionController = {
  subscribe,
  getAllSubscriptions,
  getSingleSubscription,
  deleteSubscription,
  makeUserAsSubscribed,
};