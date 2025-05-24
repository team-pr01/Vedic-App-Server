import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TYoga } from "./yoga.interface";
import Yoga from "./yoga.model";

// Add yoga for admin only
const addYoga = async (payload: TYoga, createdBy: string) => {
  const {
    name,
    sanskritName,
    description,
    imageUrl,
    videoUrl,
    difficulty,
    duration,
    benefits,
    contraindications,
    categories,
  } = payload;

  const payloadData = {
    name,
    sanskritName,
    description,
    imageUrl,
    videoUrl,
    difficulty,
    duration,
    benefits,
    contraindications,
    categories,
    createdBy,
  };

  const result = await Yoga.create(payloadData);

  return result;
};

// Get all yogas
const getAllYogas = async () => {
  const result = await Yoga.find();
  return result;
};

// Get single yoga post by id
const getSingleYogaById = async (yogaId: string) => {
  const result = await Yoga.findById(yogaId);
  return result;
};

// Update yoga
const updateYoga = async (yogaId: string, payload: Partial<TYoga>) => {
  const existingPost = await Yoga.findById(yogaId);

  if (!existingPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Yoga not found");
  }

  const result = await Yoga.findByIdAndUpdate(yogaId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete yoga by id
const deleteYoga = async (yogaId: string) => {
  const result = await Yoga.findByIdAndDelete(yogaId);
  return result;
};

export const YogaServices = {
  addYoga,
  getAllYogas,
  getSingleYogaById,
  updateYoga,
  deleteYoga,
};
