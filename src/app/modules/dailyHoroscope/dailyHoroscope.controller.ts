import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DailyHoroscopeServices } from "./dailyHoroscope.services";

// Add Daily Horoscope
const addDailyHoroscope = catchAsync(async (req, res) => {
  const result = await DailyHoroscopeServices.addDailyHoroscope(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Daily horoscope added successfully",
    data: result,
  });
});

// Get all Daily Horoscopes
const getAllDailyHoroscopes = catchAsync(async (req, res) => {
  const { keyword } = req.query; // coming from query string
  const result = await DailyHoroscopeServices.getAllDailyHoroscopes(
    keyword as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Daily horoscopes fetched successfully",
    data: result,
  });
});


// Get single Daily Horoscope by ID
const getSingleDailyHoroscopeById = catchAsync(async (req, res) => {
  const { horoscopeId } = req.params;
  const result = await DailyHoroscopeServices.getSingleDailyHoroscopeById(
    horoscopeId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Daily horoscope fetched successfully",
    data: result,
  });
});

// Update Daily Horoscope
const updateDailyHoroscope = catchAsync(async (req, res) => {
  const { horoscopeId } = req.params;
  const result = await DailyHoroscopeServices.updateDailyHoroscope(
    horoscopeId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Daily horoscope updated successfully",
    data: result,
  });
});

// Delete Daily Horoscope
const deleteDailyHoroscope = catchAsync(async (req, res) => {
  const { horoscopeId } = req.params;
  const result = await DailyHoroscopeServices.deleteDailyHoroscope(horoscopeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Daily horoscope deleted successfully",
    data: result,
  });
});

export const DailyHoroscopeControllers = {
  addDailyHoroscope,
  getAllDailyHoroscopes,
  getSingleDailyHoroscopeById,
  updateDailyHoroscope,
  deleteDailyHoroscope,
};
