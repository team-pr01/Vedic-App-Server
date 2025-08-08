import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsServices } from "./news.services";

// Add News
const addNews = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await NewsServices.addNews(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News added successfully",
    data: result,
  });
});

// Get All
const getAllNews = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;
  const result = await NewsServices.getAllNews(keyword, category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News fetched successfully.",
    data: result,
  });
});

// Get Single
const getSingleNewsById = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const result = await NewsServices.getSingleNewsById(newsId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News fetched successfully.",
    data: result,
  });
});

// Update
const updateNews = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const file = req.file;
  const result = await NewsServices.updateNews(newsId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News updated successfully.",
    data: result,
  });
});

// Delete
const deleteNews = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const result = await NewsServices.deleteNews(newsId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News deleted successfully.",
    data: result,
  });
});

export const NewsControllers = {
  addNews,
  getAllNews,
  getSingleNewsById,
  updateNews,
  deleteNews,
};
