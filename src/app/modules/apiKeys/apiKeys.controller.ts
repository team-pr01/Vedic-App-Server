import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ApiKeyServices } from "./apiKeys.services";

// Add API Key (for admin)
const addApiKey = catchAsync(async (req, res) => {
  const result = await ApiKeyServices.addApiKey(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "API Key added successfully",
    data: result,
  });
});

// Get all API Keys
const getAllApiKeys = catchAsync(async (req, res) => {
  const result = await ApiKeyServices.getAllApiKeys();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All API Keys fetched successfully",
    data: result,
  });
});

// Delete API Key by ID
const deleteApiKey = catchAsync(async (req, res) => {
  const { apiKeyId } = req.params;
  const result = await ApiKeyServices.deleteApiKey(apiKeyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "API Key deleted successfully",
    data: result,
  });
});

export const ApiKeyControllers = {
  addApiKey,
  getAllApiKeys,
  deleteApiKey,
};
