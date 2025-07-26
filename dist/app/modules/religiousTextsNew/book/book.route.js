"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
// import authorizeRoute from "../../middlewares/authorizeRoute";
const auth_constannts_1 = require("../../auth/auth.constannts");
const book_controller_1 = require("./book.controller");
const multer_config_1 = require("../../../config/multer.config");
const router = express_1.default.Router();
// Create a new book (protected: admin, moderator, super-admin)
router.post("/create-book", multer_config_1.multerUpload.single("file"), (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), book_controller_1.BookController.createBook);
// Get all books (public)
router.get("/", book_controller_1.BookController.getAllBooks);
// Get single book by ID (public)
router.get("/:bookId", book_controller_1.BookController.getSingleBook);
// Update a book (protected)
router.put("/update-book/:bookId", multer_config_1.multerUpload.single("file"), (req, res, next) => {
    next();
}, (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), book_controller_1.BookController.updateBook);
// Add or update chapters in a book (protected: admin, moderator, super-admin)
router.put("/add-chapters/:bookId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), book_controller_1.BookController.addChaptersInBook);
// Add or update satisfies;ol or mantra in a chapter (protected: admin, moderator, super-admin)
// router.put(
//   "/:bookId/chapters/:chapterIndex/slokOrMantra",
//   BookController.addSlokOrMantraToChapter
// );
// Delete a book (protected)
router.delete("/delete-book/:bookId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), 
// authorizeRoute(),
book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
