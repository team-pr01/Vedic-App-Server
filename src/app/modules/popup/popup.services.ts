/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TPopup } from "./popup.interface";
import Popup from "./popup.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

// Create Popup
const createPopup = async (
  payload: TPopup,
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
  const result = await Popup.create(payloadData);
  return result;
};

// Get All Popups (with optional title search)
const getAllPopups = async (keyword: any) => {
  const filter: any = {};

  if (keyword) {
    filter.title = { $regex: keyword, $options: "i" };
  }

  const result = await Popup.find(filter);
  return result;
};

// Get Single Popup by ID
const getPopupById = async (popupId: string) => {
  const result = await Popup.findById(popupId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Popup not found");
  }
  return result;
};

// Update Popup
const updatePopup = async (
  popupId: string,
  payload: Partial<TPopup>,
  file: any
) => {
  const existing = await Popup.findById(popupId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Popup not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `${payload?.title || existing.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TPopup> = {
    ...payload,
    ...(imageUrl && { imageUrl }),
  };

  const result = await Popup.findByIdAndUpdate(popupId, updatePayload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Popup
const deletePopup = async (popupId: string) => {
  const existing = await Popup.findById(popupId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Popup not found");
  }

  return await Popup.findByIdAndDelete(popupId);
};

export const PopupServices = {
  createPopup,
  getAllPopups,
  getPopupById,
  updatePopup,
  deletePopup,
};
