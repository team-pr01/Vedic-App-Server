/* eslint-disable @typescript-eslint/no-explicit-any */
import Chapter from "./chapter.model";
import { TChapter } from "./chapter.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";

const createChapter = async (payload: TChapter) => {
  const result = await Chapter.create(payload);
  return result;
};

const getAllChapters = async () => {
  return await Chapter.find();
};

const getSingleChapter = async (chapterId: string) => {
  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found");
  }
  return chapter;
};

const updateChapter = async (chapterId: string, payload: Partial<TChapter>) => {
  const chapter = await Chapter.findByIdAndUpdate(chapterId, payload, {
    new: true,
    runValidators: true,
  });
  if (!chapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found");
  }
  return chapter;
};

const deleteChapter = async (chapterId: string) => {
  const deletedChapter = await Chapter.findByIdAndDelete(chapterId);
  if (!deletedChapter) {
    throw new AppError(httpStatus.NOT_FOUND, "Chapter not found");
  }
  return deletedChapter;
};

export const ChapterService = {
  createChapter,
  getAllChapters,
  getSingleChapter,
  updateChapter,
  deleteChapter,
};
