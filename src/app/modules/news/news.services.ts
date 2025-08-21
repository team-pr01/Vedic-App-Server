/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TNews } from "./news.interface";
import News from "./news.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const addNews = async (
  payload: TNews,
  file: Express.Multer.File | undefined
) => {
  let imageUrl = "";

  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    ...payload,
    imageUrl,
  };
  const result = await News.create(payloadData);
  return result;
};

const getAllNews = async (keyword: any, category: any) => {
  const query: any = {};

  if (keyword) {
    query.$or = [{ title: { $regex: keyword, $options: "i" } }];
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const result = await News.find(query);
  return result;
};

const getSingleNewsById = async (newsId: string) => {
  const result = await News.findById(newsId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }
  return result;
};

const updateNews = async (newsId: string, payload: Partial<TNews>, file: any) => {
  const existing = await News.findById(newsId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "News not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `${payload?.title || existing.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TNews> = {
      ...payload,
      ...(imageUrl && { imageUrl }),
    };

  const result = await News.findByIdAndUpdate(newsId, updatePayload, {
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
