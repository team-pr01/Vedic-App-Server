/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBook } from "./book.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import Book from "./book.model";
import { FilterQuery } from "mongoose";

// ✅ Create a new book
const createBook = async (
  payload: TBook,
  file: Express.Multer.File | undefined
) => {
  let imageUrl = "";

  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  // 🛠️ Fix: parse sections if it's a string (due to FormData)
  let parsedSections = payload.sections;
  if (typeof parsedSections === "string") {
    try {
      parsedSections = JSON.parse(parsedSections);
    } catch (error) {
      throw new Error("Invalid JSON format for sections");
    }
  }

  const payloadData = {
    ...payload,
    sections: parsedSections,
    imageUrl,
  };

  const result = await Book.create(payloadData);
  return result;
};


// ✅ Get all books
const getAllBooks = async (searchTerm?: string) => {
  let filter: FilterQuery<any> = {};

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, "i"); // case-insensitive
    filter = {
      $or: [
        { title: { $regex: searchRegex } },
        { "chapters.slokOrMantras.originalText": { $regex: searchRegex } },
      ],
    };
  }

  const books = await Book.find(filter);
  return books;
};

// ✅ Get single book by ID
const getSingleBook = async (bookId: string) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }
  return book;
};

const updateBook = async (id: string, payload: Partial<TBook>, file: any) => {
  // First get the existing book
  const existingBook = await Book.findById(id);
  if (!existingBook) {
    throw new Error("Book not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `${payload?.title || existingBook.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TBook> = {
    ...payload,
    ...(imageUrl && { imageUrl }),
  };

  const result = await Book.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// ✅ Delete book by ID
const deleteBook = async (bookId: string) => {
  const deletedBook = await Book.findByIdAndDelete(bookId);
  if (!deletedBook) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }
  return deletedBook;
};

const addBookChapters = async (bookId: string, newChapters: any[]) => {
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { $push: { chapters: { $each: newChapters } } },
    { new: true, runValidators: true }
  );
  return updatedBook;
};

// const addSlokOrMantraToChapter = async (
//   bookId: string,
//   chapterIndex: number,
//   payload: any
// ) => {
//   const bookDoc = await Book.findById(bookId);
//   if (!bookDoc) throw new Error("Book not found");

//   const book = bookDoc.toObject() as TBook;
//   const chapter = book.chapters?.[chapterIndex];
//   if (!chapter) throw new Error("Chapter not found");

//   const normalizedType = payload.type.toLowerCase();

//   // Add type
//   if (!Array.isArray(chapter.type)) chapter.type = [];
//   if (!chapter.type.includes(normalizedType)) chapter.type.push(normalizedType);

//   // Flat and unique type
//   chapter.type = [...new Set(chapter.type.flat())];

//   // Ensure slokOrMantras exists
//   if (!Array.isArray(chapter.slokOrMantras)) chapter.slokOrMantras = [];

//   // Push new slok/mantra
//   const newSlok = {
//     ...payload,
//     type: normalizedType as any,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   chapter.slokOrMantras.push(newSlok);

//   // Debug check
//   console.log("Added slok:", newSlok);
//   console.log("Final chapter:", chapter);

//   // Mark paths as modified
//   book.markModified(`chapters.${chapterIndex}.slokOrMantras`);
//   book.markModified(`chapters.${chapterIndex}.type`);

//   // Save and return updated book
//   const updatedBook = await book.save();
//   return updatedBook;
// };

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addBookChapters,
  // addSlokOrMantraToChapter,
};
