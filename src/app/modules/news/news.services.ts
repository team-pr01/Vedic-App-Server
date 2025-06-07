import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TNews } from "./news.interface";
import News from "./news.model";

const addNews = async (payload: TNews) => {
  const result = await News.create(payload);
  return result;
};

const getAllNews = async () => {
  return await News.find();
};

const getSingleNewsById = async (newsId: string) => {
  const result = await News.findById(newsId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }
  return result;
};

const updateNews = async (newsId: string, payload: Partial<TNews>) => {
  const existing = await News.findById(newsId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }

  const result = await News.findByIdAndUpdate(newsId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteNews = async (newsId: string) => {
  const existing = await News.findById(newsId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }

  return await News.findByIdAndDelete(newsId);
};

export const NewsServices = {
  addNews,
  getAllNews,
  getSingleNewsById,
  updateNews,
  deleteNews,
};
