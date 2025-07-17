import { Request, Response } from "express";
import httpStatus from "http-status";
import { ChapterService } from "./chapter.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createChapter = catchAsync(async (req: Request, res: Response) => {
  const result = await ChapterService.createChapter(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Chapter created successfully",
    data: result,
  });
});

const getAllChapters = catchAsync(async (req: Request, res: Response) => {
  const result = await ChapterService.getAllChapters();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapters retrieved successfully",
    data: result,
  });
});

const getSingleChapter = catchAsync(async (req: Request, res: Response) => {
  const result = await ChapterService.getSingleChapter(req.params.chapterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapter retrieved successfully",
    data: result,
  });
});

const updateChapter = catchAsync(async (req: Request, res: Response) => {
  const result = await ChapterService.updateChapter(req.params.chapterId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Chapter updated successfully",
    data: result,
  });
});

const deleteChapter = catchAsync(async (req: Request, res: Response) => {
  const { chapterId } = req.params;
  
    const result = await ChapterService.deleteChapter(chapterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Chapter Deleted successfully`,
    data: result,
  });
});

export const ChapterController = {
  createChapter,
  getAllChapters,
  getSingleChapter,
  updateChapter,
  deleteChapter,
};
