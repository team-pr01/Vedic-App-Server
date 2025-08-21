import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReligiousTextServices } from "./religiousTexts.services";

// Create ReligiousText
const createReligiousText = catchAsync(async (req, res) => {
  const textData = req.body;
  const result = await ReligiousTextServices.createReligiousText(textData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Religious text created successfully",
    data: result,
  });
});

// Get All ReligiousTexts (filtered by vedaName, searched by originalText)
const getAllReligiousTexts = catchAsync(async (req, res) => {
  const { vedaName, keyword } = req.query as {
    vedaName?: string;
    keyword?: string;
  };

  const result = await ReligiousTextServices.getAllReligiousTexts({ vedaName, keyword });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Religious texts fetched successfully",
    data: result,
  });
});


// Get Single ReligiousText by ID
const getReligiousTextById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ReligiousTextServices.getReligiousTextById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Religious text fetched successfully",
    data: result,
  });
});

// Update ReligiousText by ID
const updateReligiousText = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await ReligiousTextServices.updateReligiousText(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Religious text updated successfully",
    data: result,
  });
});

// Delete ReligiousText by ID
const deleteReligiousText = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ReligiousTextServices.deleteReligiousText(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Religious text deleted successfully",
    data: result,
  });
});

export const ReligiousTextControllers = {
  createReligiousText,
  getAllReligiousTexts,
  getReligiousTextById,
  updateReligiousText,
  deleteReligiousText,
};
