import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import ApiKeys from "./apiKeys.model";
import { TApiKeys } from "./apiKeys.interface";

// Add new API Key
const addApiKey = async (payload: TApiKeys) => {
  const result = await ApiKeys.create(payload);
  return result;
};

// Get all API Keys
const getAllApiKeys = async () => {
  const result = await ApiKeys.find();
  return result;
};

// Delete API Key by ID
const deleteApiKey = async (apiKeyId: string) => {
  const result = await ApiKeys.findByIdAndDelete(apiKeyId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "API Key not found");
  }

  return result;
};

export const ApiKeyServices = {
  addApiKey,
  getAllApiKeys,
  deleteApiKey,
};
