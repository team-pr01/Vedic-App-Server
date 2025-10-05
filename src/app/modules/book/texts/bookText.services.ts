/* eslint-disable @typescript-eslint/no-explicit-any */
import BookText from "./bookText.model";
import { TBookText } from "./bookText.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";

const createBookText = async (payload: TBookText) => {
  const result = await BookText.create(payload);
  return result;
};

const getAllBookTexts = async (keyword?: string) => {
  let query = {};

  if (keyword) {
    const regex = new RegExp(keyword, "i");
    query = {
      $or: [
        { "location.chapter": regex },
        { "location.verse": regex },
        { originalText: regex },
        { primaryTranslation: regex },
        { tags: regex },
      ],
    };
  }

  return await BookText.find(query).populate("bookId", "name type structure");
};

const getSingleBookText = async (bookTextId: string) => {
  const bookText = await BookText.findById(bookTextId).populate(
    "bookId",
    "name type structure"
  );

  if (!bookText) {
    throw new AppError(httpStatus.NOT_FOUND, "Book text not found");
  }

  return bookText;
};

const updateBookText = async (bookTextId: string, payload: Partial<TBookText>) => {
  const existing = await BookText.findById(bookTextId);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Book text not found");
  }

  const result = await BookText.findByIdAndUpdate(bookTextId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBookText = async (bookTextId: string) => {
  const result = await BookText.findByIdAndDelete(bookTextId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Book text not found");
  }

  return result;
};

export const BookTextService = {
  createBookText,
  getAllBookTexts,
  getSingleBookText,
  updateBookText,
  deleteBookText,
};
