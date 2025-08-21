/* eslint-disable @typescript-eslint/no-explicit-any */
import SlokOrMantra from "./slokOrMantra.model";
import { TSlokOrMantra } from "./slokOrMantra.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";

const createSlokOrMantra = async (payload: TSlokOrMantra) => {
  const result = await SlokOrMantra.create(payload);
  return result;
};

const getAllSlokOrMantras = async () => {
  return await SlokOrMantra.find();
};

const getSingleSlokOrMantra = async (id: string) => {
  const item = await SlokOrMantra.findById(id);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Slok or Mantra not found");
  }
  return item;
};

const updateSlokOrMantra = async (id: string, payload: Partial<TSlokOrMantra>) => {
  const item = await SlokOrMantra.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Slok or Mantra not found");
  }
  return item;
};

const deleteSlokOrMantra = async (id: string) => {
  const deletedItem = await SlokOrMantra.findByIdAndDelete(id);
  if (!deletedItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Slok or Mantra not found");
  }
  return deletedItem;
};

export const SlokOrMantraService = {
  createSlokOrMantra,
  getAllSlokOrMantras,
  getSingleSlokOrMantra,
  updateSlokOrMantra,
  deleteSlokOrMantra,
};
