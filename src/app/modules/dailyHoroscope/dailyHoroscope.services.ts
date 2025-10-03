/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import DailyHoroscope from "./dailyHoroscope.model";
import { TDailyHoroscope } from "./dailyHoroscope.interface";

// Add Daily Horoscope
const addDailyHoroscope = async (payload: TDailyHoroscope) => {
  const result = await DailyHoroscope.create(payload);
  return result;
};

// Get all Daily Horoscopes
const getAllDailyHoroscopes = async (keyword?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { color: { $regex: keyword, $options: "i" } },
      { number: { $regex: keyword, $options: "i" } },
      { direction: { $regex: keyword, $options: "i" } },
    ];
  }

  const result = await DailyHoroscope.find(query);
  return result;
};


// Get single Daily Horoscope by ID
const getSingleDailyHoroscopeById = async (horoscopeId: string) => {
  const result = await DailyHoroscope.findById(horoscopeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Daily horoscope not found");
  }
  return result;
};

// Update Daily Horoscope
const updateDailyHoroscope = async (
  horoscopeId: string,
  payload: Partial<TDailyHoroscope>
) => {
  const existing = await DailyHoroscope.findById(horoscopeId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Daily horoscope not found");
  }

  const result = await DailyHoroscope.findByIdAndUpdate(horoscopeId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Daily Horoscope
const deleteDailyHoroscope = async (horoscopeId: string) => {
  const result = await DailyHoroscope.findByIdAndDelete(horoscopeId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Daily horoscope not found");
  }
  return result;
};

export const DailyHoroscopeServices = {
  addDailyHoroscope,
  getAllDailyHoroscopes,
  getSingleDailyHoroscopeById,
  updateDailyHoroscope,
  deleteDailyHoroscope,
};
