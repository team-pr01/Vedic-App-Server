import { Request, Response } from "express";
import httpStatus from "http-status";
import { SlokOrMantraService } from "./slokOrMantra.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createSlokOrMantra = catchAsync(async (req: Request, res: Response) => {
  const result = await SlokOrMantraService.createSlokOrMantra(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Slok or Mantra created successfully",
    data: result,
  });
});

const getAllSlokOrMantras = catchAsync(async (req: Request, res: Response) => {
  const result = await SlokOrMantraService.getAllSlokOrMantras();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slok or Mantra list retrieved successfully",
    data: result,
  });
});

const getSingleSlokOrMantra = catchAsync(async (req: Request, res: Response) => {
  const result = await SlokOrMantraService.getSingleSlokOrMantra(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slok or Mantra retrieved successfully",
    data: result,
  });
});

const updateSlokOrMantra = catchAsync(async (req: Request, res: Response) => {
  const result = await SlokOrMantraService.updateSlokOrMantra(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slok or Mantra updated successfully",
    data: result,
  });
});

const deleteSlokOrMantra = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SlokOrMantraService.deleteSlokOrMantra(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slok or Mantra deleted successfully",
    data: result,
  });
});

export const SlokOrMantraController = {
  createSlokOrMantra,
  getAllSlokOrMantras,
  getSingleSlokOrMantra,
  updateSlokOrMantra,
  deleteSlokOrMantra,
};
