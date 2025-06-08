import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContentService } from "./content.services";
import AppError from "../../errors/AppError";

const createContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.createContent(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Content created successfully",
    data: result,
  });
});

const getAllContents = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.getAllContents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contents retrieved successfully",
    data: result,
  });
});

const getSingleContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.getSingleContent(req.params.contentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Content retrieved successfully",
    data: result,
  });
});

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.updateContent(req.params.contentId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Content updated successfully",
    data: result,
  });
});

const deleteContent = catchAsync(async (req: Request, res: Response) => {
  const { contentId, type, url } = req.params;

  // Validate type
  if (!['image', 'video'].includes(type)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid media type");
  }

  if (!url) {
    throw new AppError(httpStatus.BAD_REQUEST, "URL is required");
  }

  const result = await ContentService.deleteContent(contentId, type, url);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${type} URL removed successfully`,
    data: result,
  });
});


export const ContentController = {
  createContent,
  getAllContents,
  getSingleContent,
  updateContent,
  deleteContent,
};
