/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TReligiousText } from "./religiousTexts.interface";
import ReligiousText from "./religiousTexts.model";

// Create Religious Text
const createReligiousText = async (payload: TReligiousText) => {
  const result = await ReligiousText.create(payload);
  return result;
};

// Get All Religious Texts (with optional vedaName and originalText search)
const getAllReligiousTexts = async (filters: {
  vedaName?: string;
  keyword?: string;
}) => {
  const query: any = {};

  if (filters.vedaName) {
    query.vedaName = filters.vedaName;
  }

  if (filters.keyword) {
    query.originalText = { $regex: filters.keyword, $options: "i" };
  }

  const result = await ReligiousText.find(query).sort({ createdAt: -1 });
  return result;
};

// Get Single Religious Text by ID
const getReligiousTextById = async (id: string) => {
  const result = await ReligiousText.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Religious text not found");
  }
  return result;
};

// Update Religious Text
const updateReligiousText = async (
  id: string,
  payload: Partial<TReligiousText>
) => {
  const existing = await ReligiousText.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Religious text not found");
  }

  const result = await ReligiousText.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Religious Text
const deleteReligiousText = async (id: string) => {
  const existing = await ReligiousText.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Religious text not found");
  }

  return await ReligiousText.findByIdAndDelete(id);
};

export const ReligiousTextServices = {
  createReligiousText,
  getAllReligiousTexts,
  getReligiousTextById,
  updateReligiousText,
  deleteReligiousText,
};
