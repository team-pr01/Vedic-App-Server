import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TempleServices } from "./temples.services";

// Add temple (For admin)
const addTemple = catchAsync(async (req, res) => {
  const createdBy = req.user.userId;
  const result = await TempleServices.addTemple(req.body, createdBy);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Temple added successfully",
    data: result,
  });
});

// Get all temples
const getAllTemples = catchAsync(async (req, res) => {
  const result = await TempleServices.getAllTemples();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Temples fetched successfully.",
    data: result,
  });
});

// Get single temple by id
const getSingleTempleById = catchAsync(async (req, res) => {
  const { templeId } = req.params;
  const result = await TempleServices.getSingleTempleById(templeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Temple fetched successfully.",
    data: result,
  });
});

// Update temple
const updateTemple = catchAsync(async (req, res) => {
  const { templeId } = req.params;
  const result = await TempleServices.updateTemple(templeId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Temple details updated successfully",
    data: result,
  });
});

// Delete temple by id
const deleteTemple = catchAsync(async (req, res) => {
  const { templeId } = req.params;
  const result = await TempleServices.deleteTemple(templeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Temple deleted successfully",
    data: result,
  });
});

export const TempleControllers = {
  addTemple,
  getAllTemples,
  getSingleTempleById,
  updateTemple,
  deleteTemple,
};
