import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AyurvedaServices } from "./ayurveda.services";

// Add Ayurveda
const addAyurveda = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await AyurvedaServices.addAyurveda(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ayurveda item added successfully",
    data: result,
  });
});

// Get all Ayurveda
const getAllAyurveda = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;
  const result = await AyurvedaServices.getAllAyurveda(
    keyword as string,
    category as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ayurveda items fetched successfully.",
    data: result,
  });
});


// Get single Ayurveda by id
const getSingleAyurvedaById = catchAsync(async (req, res) => {
  const { ayurvedaId } = req.params;
  const result = await AyurvedaServices.getSingleAyurvedaById(ayurvedaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ayurveda item fetched successfully.",
    data: result,
  });
});

// Update Ayurveda
const updateAyurveda = catchAsync(async (req, res) => {
  const { ayurvedaId } = req.params;
  const result = await AyurvedaServices.updateAyurveda(ayurvedaId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ayurveda item updated successfully",
    data: result,
  });
});

// Delete Ayurveda
const deleteAyurveda = catchAsync(async (req, res) => {
  const { ayurvedaId } = req.params;
  const result = await AyurvedaServices.deleteAyurveda(ayurvedaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ayurveda item deleted successfully",
    data: result,
  });
});

export const AyurvedaControllers = {
  addAyurveda,
  getAllAyurveda,
  getSingleAyurvedaById,
  updateAyurveda,
  deleteAyurveda,
};
