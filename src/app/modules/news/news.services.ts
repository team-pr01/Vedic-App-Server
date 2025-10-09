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
    const imageName = `${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }
  
  let translations = payload.translations;
  if (typeof translations === "string") {
    translations = JSON.parse(translations);
  }

  const payloadData = {
    ...payload,
    imageUrl,
    translations,
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
    const imageName = `${Date.now()}`;
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

const toggleLikeNews = async (newsId: string, userId: string) => {
  const news = await News.findById(newsId);
  if (!news) throw new Error("News not found");

  const likedIndex = news.likedBy!.findIndex(id => id.toString() === userId);

  if (likedIndex >= 0) {
    // User already liked -> unlike
    news.likedBy!.splice(likedIndex, 1);
    news.likes = Math.max(0, news.likes! - 1);
  } else {
    // User not liked -> like
    news.likedBy!.push(userId);
    news.likes! += 1;
  }

  await news.save();
  return news;
};

const addNewsView = async (newsId: string, userId: string) => {
  const news = await News.findById(newsId);
  if (!news) throw new Error("News not found");

  // Only increment if user hasn't viewed yet
  if (!news.viewedBy!.includes(userId as any)) {
    news.viewedBy!.push(userId);
    news.views! += 1;
    await news.save();
  }

  return news;
};

export const NewsServices = {
  addNews,
  getAllNews,
  getSingleNewsById,
  updateNews,
  deleteNews,
  toggleLikeNews,
  addNewsView
};
