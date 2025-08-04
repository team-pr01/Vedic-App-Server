"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const book_services_1 = require("./book.services");
const AppError_1 = __importDefault(require("../../../errors/AppError"));
// ✅ Create a new book
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield book_services_1.BookService.createBook(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Book created successfully",
        data: result,
    });
}));
// ✅ Get all books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    const result = yield book_services_1.BookService.getAllBooks(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieved successfully",
        data: result,
    });
}));
// ✅ Get a single book by ID
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    if (!bookId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Book ID is required.");
    }
    const result = yield book_services_1.BookService.getSingleBook(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book retrieved successfully",
        data: result,
    });
}));
// ✅ Update book by ID
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { bookId } = req.params;
    // ✅ Parse 'sections' if it's a string
    if (typeof req.body.sections === "string") {
        try {
            req.body.sections = JSON.parse(req.body.sections);
        }
        catch (error) {
            return res.status(400).json({
                message: "Invalid JSON in 'sections'",
                error,
            });
        }
    }
    const result = yield book_services_1.BookService.updateBook(bookId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book updated successfully",
        data: result,
    });
}));
// ✅ Delete book by ID
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_services_1.BookService.deleteBook(bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book deleted successfully",
        data: result,
    });
}));
const addChaptersInBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const chapterData = req.body.chapters;
    const result = yield book_services_1.BookService.addBookChapters(bookId, chapterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Chapters updated successfully",
        data: result,
    });
}));
// const addSlokOrMantraToChapter = catchAsync(
//   async (req: Request, res: Response) => {
//     const { bookId, chapterIndex } = req.params;
//     const result = await BookService.addSlokOrMantraToChapter(
//       bookId,
//       parseInt(chapterIndex),
//       req.body
//     );
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Slok or Mantra added to chapter successfully",
//       data: result,
//     });
//   }
// );
exports.BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addChaptersInBook,
    // addSlokOrMantraToChapter
};
