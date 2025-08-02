/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TVastu } from "./vastu.interface";
import Vastu from "./vastu.model";

// Add vastu for (admin only)
const addVastu = async (payload: TVastu) => {
  const { title, category, videoUrl } = payload;

  const payloadData = {
    title,
    category,
    videoUrl,
  };

  const result = await Vastu.create(payloadData);

  return result;
};

// Get all vastus
const getAllVastus = async (category?: string, search?: string) => {
  const query: any = {};

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Search by keyword in title (case-insensitive)
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const result = await Vastu.find(query);
  return result;
};

// Get single vastu post by id
const getSingleVastuById = async (vastuId: string) => {
  const result = await Vastu.findById(vastuId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu not found");
  }
  return result;
};

// Update vastu
const updateVastu = async (vastuId: string, payload: Partial<TVastu>) => {
  const existingPost = await Vastu.findById(vastuId);

  if (!existingPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu not found");
  }

  const result = await Vastu.findByIdAndUpdate(vastuId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete vastu by id
const deleteVastu = async (vastuId: string) => {
  const result = await Vastu.findByIdAndDelete(vastuId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu not found");
  }
  return result;
};

export const VastuServices = {
  addVastu,
  getAllVastus,
  getSingleVastuById,
  updateVastu,
  deleteVastu,
};
