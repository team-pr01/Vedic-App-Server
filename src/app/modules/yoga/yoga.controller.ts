import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { YogaServices } from "./yoga.services";

// Add yoga (For admin)
const addYoga = catchAsync(async (req, res) => {
  const createdBy = req.user.userId;
  console.log(req.body);
  const result = await YogaServices.addYoga(req.body, createdBy);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Yoga added successfully',
    data: result,
  });
});

// Get all yogas
const getAllYogas = catchAsync(async (req, res) => {
  const result = await YogaServices.getAllYogas();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Yogas fetched successfully.",
    data: result,
  });
});

// Get single yoga by id
const getSingleYogaById = catchAsync(async (req, res) => {
  const { yogaId } = req.params;
  const result = await YogaServices.getSingleYogaById(yogaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Yoga fetched successfully.',
    data: result,
  });
});

// Update yoga
const updateYoga = catchAsync(async (req, res) => {
  const { yogaId } = req.params;
  const result = await YogaServices.updateYoga(yogaId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Yoga details updated successfully',
    data: result,
  });
});

// Delete yoga by id
const deleteYoga = catchAsync(async (req, res) => {
  const { yogaId } = req.params;
  const result = await YogaServices.deleteYoga(yogaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Yoga deleted successfully',
    data: result,
  });
});

export const YogaControllers = {
  addYoga,
  getAllYogas,
  getSingleYogaById,
  updateYoga,
  deleteYoga,
};
