/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Ayurveda from "./ayurveda.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TAyurveda } from "./ayurveda.interface";

// Add Ayurveda (for admin only)
const addAyurveda = async (
  payload: TAyurveda,
  file: Express.Multer.File | undefined
) => {
  const { videoUrl, expertName, duration, content, category } = payload;

  let imageUrl = "";

  if (file) {
    const imageName = `${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    imageUrl,
    videoUrl,
    expertName,
    duration,
    content,
    category,
  };

  const result = await Ayurveda.create(payloadData);
  return result;
};

// Get all Ayurveda
const getAllAyurveda = async (keyword?: string, category?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [{ expertName: { $regex: keyword, $options: "i" } }];
    query.$or = [{ content: { $regex: keyword, $options: "i" } }];
  }

  if (category) {
    query.category = category;
  }

  const result = await Ayurveda.find(query);
  return result;
};

// Get single Ayurveda by id
const getSingleAyurvedaById = async (ayurvedaId: string) => {
  const result = await Ayurveda.findById(ayurvedaId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Ayurveda item not found");
  }
  return result;
};

// Update Ayurveda
const updateAyurveda = async (
  ayurvedaId: string,
  payload: Partial<TAyurveda>
) => {
  const existing = await Ayurveda.findById(ayurvedaId);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Ayurveda item not found");
  }

  const result = await Ayurveda.findByIdAndUpdate(ayurvedaId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Ayurveda
const deleteAyurveda = async (ayurvedaId: string) => {
  const result = await Ayurveda.findByIdAndDelete(ayurvedaId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Ayurveda item not found");
  }
  return result;
};

export const AyurvedaServices = {
  addAyurveda,
  getAllAyurveda,
  getSingleAyurvedaById,
  updateAyurveda,
  deleteAyurveda,
};
