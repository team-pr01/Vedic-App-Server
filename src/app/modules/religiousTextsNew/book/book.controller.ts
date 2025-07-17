import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./book.services";
import AppError from "../../../errors/AppError";

// ✅ Create a new book
const createBook = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const file = req.file;

  const result = await BookService.createBook(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});


// ✅ Get all books
const getAllBooks = catchAsync(async (_req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

// ✅ Get a single book by ID
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  if (!bookId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Book ID is required.");
  }

  const result = await BookService.getSingleBook(bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

// ✅ Update book by ID

const updateBook = catchAsync(async (req, res) => {
  const file = req.file;
  const { bookId } = req.params;
  const result = await BookService.updateBook(bookId, req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

// ✅ Delete book by ID
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  console.log(bookId);

  const result = await BookService.deleteBook(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
