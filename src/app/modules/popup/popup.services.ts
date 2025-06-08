/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TPopup } from "./popup.interface";
import Popup from "./popup.model";

// Create Popup
const createPopup = async (payload: TPopup) => {
  const result = await Popup.create(payload);
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
const updatePopup = async (popupId: string, payload: Partial<TPopup>) => {
  const existing = await Popup.findById(popupId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Popup not found");
  }

  const result = await Popup.findByIdAndUpdate(popupId, payload, {
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
