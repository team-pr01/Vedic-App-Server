"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const books_controller_1 = require("./books.controller");
const authorizeRoute_1 = __importDefault(require("../../../middlewares/authorizeRoute"));
const multer_config_1 = require("../../../config/multer.config");
const router = express_1.default.Router();
// Create a new book (with optional image)
router.post("/create-book", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), books_controller_1.BooksController.createBook);
// Get all books
router.get("/", books_controller_1.BooksController.getAllBooks);
// Get a single book by ID
router.get("/:bookId", books_controller_1.BooksController.getSingleBook);
// Update a book by ID (with optional new image)
router.put("/update/:bookId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), multer_config_1.multerUpload.single("file"), books_controller_1.BooksController.updateBook);
// Delete a book by ID
router.delete("/delete/:bookId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), (0, authorizeRoute_1.default)(), books_controller_1.BooksController.deleteBook);
exports.BooksRoutes = router;
