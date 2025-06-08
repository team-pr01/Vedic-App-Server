/* eslint-disable @typescript-eslint/no-explicit-any */
import Content from "./content.model";
import { TContent } from "./content.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createContent = async (payload: TContent) => {
  const result = await Content.create(payload);
  return result;
};

const getAllContents = async () => {
  return await Content.find();
};

const getSingleContent = async (contentId: string) => {
  const content = await Content.findById(contentId);
  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, "Content not found");
  }
  return content;
};

const updateContent = async (contentId: string, payload: Partial<TContent>) => {
  const content = await Content.findByIdAndUpdate(contentId, payload, {
    new: true,
    runValidators: true,
  });
  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, "Content not found");
  }
  return content;
};

const deleteContent = async (contentId: string, type: any, url: string) => {
  const updateField = type === 'image' ? 'imageUrl' : 'videoUrl';

  const content = await Content.findByIdAndUpdate(
    contentId,
    { $pull: { [updateField]: url } }, // MongoDB `$pull` removes matching value from array
    { new: true }
  );

  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, "Content not found");
  }

  return content;
};


export const ContentService = {
  createContent,
  getAllContents,
  getSingleContent,
  updateContent,
  deleteContent,
};
