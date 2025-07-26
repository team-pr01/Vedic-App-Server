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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../../utils/sendImageToCloudinary");
const book_model_1 = __importDefault(require("./book.model"));
// ✅ Create a new book
const createBook = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = "";
    if (file) {
        const imageName = `${payload.title}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    // 🛠️ Fix: parse sections if it's a string (due to FormData)
    let parsedSections = payload.sections;
    if (typeof parsedSections === "string") {
        try {
            parsedSections = JSON.parse(parsedSections);
        }
        catch (error) {
            throw new Error("Invalid JSON format for sections");
        }
    }
    const payloadData = Object.assign(Object.assign({}, payload), { sections: parsedSections, imageUrl });
    const result = yield book_model_1.default.create(payloadData);
    return result;
});
// ✅ Get all books
const getAllBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, "i"); // case-insensitive
        filter = {
            $or: [
                { title: { $regex: searchRegex } },
                { "chapters.slokOrMantras.originalText": { $regex: searchRegex } },
            ],
        };
    }
    const books = yield book_model_1.default.find(filter);
    return books;
});
// ✅ Get single book by ID
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    return book;
});
const updateBook = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // First get the existing book
    const existingBook = yield book_model_1.default.findById(id);
    if (!existingBook) {
        throw new Error("Book not found");
    }
    let imageUrl;
    if (file) {
        const imageName = `${(payload === null || payload === void 0 ? void 0 : payload.title) || existingBook.title}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const updatePayload = Object.assign(Object.assign({}, payload), (imageUrl && { imageUrl }));
    const result = yield book_model_1.default.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// ✅ Delete book by ID
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield book_model_1.default.findByIdAndDelete(bookId);
    if (!deletedBook) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    return deletedBook;
});
const addBookChapters = (bookId, newChapters) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, { $push: { chapters: { $each: newChapters } } }, { new: true, runValidators: true });
    return updatedBook;
});
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
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addBookChapters,
    // addSlokOrMantraToChapter,
};
