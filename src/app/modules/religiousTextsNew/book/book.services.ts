/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBook, TSlokOrMantra } from "./book.interface";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { sendImageToCloudinary } from "../../../utils/sendImageToCloudinary";
import Book from "./book.model";

// ✅ Create a new book
const createBook = async (payload: TBook, file: Express.Multer.File | undefined) => {
  let imageUrl = '';

  if (file) {
    const imageName = `${payload.title}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    ...payload,
    imageUrl, // string, not array
  };

  const result = await Book.create(payloadData);
  return result;
};



// ✅ Get all books
const getAllBooks = async () => {
  const books = await Book.find();
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
        throw new Error('Book not found');
    }

    let imageUrl: string | undefined;

    if (file) {
        const imageName = `${payload?.title || existingBook.title}-${Date.now()}`;
        const path = file.path;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        imageUrl = secure_url;
    }

    // Prepare the update payload
    const updatePayload: Partial<TBook> = {
        ...payload,
        ...(imageUrl && { imageUrl }) // Only add imageUrl if it exists
    };

    const result = await Book.findByIdAndUpdate(
        id, 
        updatePayload, 
        {
            new: true,
            runValidators: true,
        }
    );

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


const addBookChapters = async (bookId: string, chapters: any[]) => {
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { $set: { chapters } },
    { new: true, runValidators: true }
  );
  return updatedBook;
};


const addSlokOrMantraToChapter = async (
  bookId: string,
  chapterIndex: number,
  payload: TSlokOrMantra
) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (!book.chapters || !book.chapters[chapterIndex]) {
    throw new Error("Chapter not found at the specified index");
  }

  const chapter = book.chapters[chapterIndex];

  const normalizedType = payload.type.toLowerCase();

  if (!chapter.type?.includes(normalizedType)) {
    chapter.type?.push(normalizedType);
  }

  if (!chapter.slokOrMantras) {
    chapter.slokOrMantras = [];
  }

  chapter.slokOrMantras.push({
    ...payload,
    type: normalizedType as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  book.markModified("chapters");

  try {
    return await book.save();
  } catch (error:any) {
    throw new Error(`Validation failed: ${error.message}`);
  }
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addBookChapters,
  addSlokOrMantraToChapter,
};
