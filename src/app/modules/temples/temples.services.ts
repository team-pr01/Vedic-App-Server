import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TTemple } from "./temples.interface";
import Temple from "./temples.model";

// Add temple for admin only
const addTemple = async (payload: TTemple, createdBy: string) => {
  const {
    name,
    mainDeity,
    description,
    address,
    city,
    state,
    country,
    establishedYear,
    visitingHours,
    contactInfo,
    imageUrl,
    videoUrl,
  } = payload;

  const payloadData = {
    name,
    mainDeity,
    description,
    address,
    city,
    state,
    country,
    establishedYear,
    visitingHours,
    contactInfo,
    imageUrl,
    videoUrl,
    createdBy,
  };

  const result = await Temple.create(payloadData);
  return result;
};

// Get all temples
const getAllTemples = async () => {
  const result = await Temple.find();
  return result;
};

// Get single temple post by id
const getSingleTempleById = async (templeId: string) => {
  const result = await Temple.findById(templeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }
  return result;
};

// Update temple
const updateTemple = async (templeId: string, payload: Partial<TTemple>) => {
  const existingTemple = await Temple.findById(templeId);

  if (!existingTemple) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }

  const result = await Temple.findByIdAndUpdate(templeId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete temple by id
const deleteTemple = async (templeId: string) => {
  const result = await Temple.findByIdAndDelete(templeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Temple not found");
  }
  return result;
};

export const TempleServices = {
  addTemple,
  getAllTemples,
  getSingleTempleById,
  updateTemple,
  deleteTemple,
};
