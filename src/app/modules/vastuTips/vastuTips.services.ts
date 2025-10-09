/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import VastuTip from "./vastuTips.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TVastuTips } from "./vastuTips.interface";

// Add Vastu Tip
const addVastuTip = async (
  payload: TVastuTips,
  file: Express.Multer.File | undefined
) => {
  let imageUrl = "";

  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    ...payload,
    imageUrl,
  };

  const result = await VastuTip.create(payloadData);
  return result;
};

// Get all Vastu Tips
const getAllVastuTips = async (keyword: any, category: any) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category && category !== "all") {
    query.category = { $regex: category, $options: "i" };
  }

  const result = await VastuTip.find(query);
  return result;
};

// Get single Vastu Tip by ID
const getSingleVastuTipById = async (id: string) => {
  const result = await VastuTip.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu Tip not found");
  }
  return result;
};

// Update Vastu Tip
const updateVastuTip = async (
  id: string,
  payload: Partial<TVastuTips>,
  file: any
) => {
  const existing = await VastuTip.findById(id);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu Tip not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `${payload?.title || existing.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TVastuTips> = {
    ...payload,
    ...(imageUrl && { imageUrl }),
  };

  const result = await VastuTip.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Vastu Tip by ID
const deleteVastuTip = async (id: string) => {
  const result = await VastuTip.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vastu Tip not found");
  }
  return result;
};

export const VastuTipsServices = {
  addVastuTip,
  getAllVastuTips,
  getSingleVastuTipById,
  updateVastuTip,
  deleteVastuTip,
};
