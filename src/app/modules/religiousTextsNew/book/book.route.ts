import express, { NextFunction, Request, Response } from "express";
import auth from "../../../middlewares/auth";
// import authorizeRoute from "../../middlewares/authorizeRoute";
import { UserRole } from "../../auth/auth.constannts";
import { BookController } from "./book.controller";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

// Create a new book (protected: admin, moderator, super-admin)
router.post(
  "/create-book",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  BookController.createBook
);

// Get all books (public)
router.get("/", BookController.getAllBooks);

// Get single book by ID (public)
router.get("/:bookId", BookController.getSingleBook);

// Update a book (protected)
router.put(
  "/update-book/:bookId",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  BookController.updateBook
);

// Add or update chapters in a book (protected: admin, moderator, super-admin)
router.put(
  "/add-chapters/:bookId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  BookController.addChaptersInBook
);

// Add or update satisfies;ol or mantra in a chapter (protected: admin, moderator, super-admin)
// router.put(
//   "/:bookId/chapters/:chapterIndex/slokOrMantra",
//   BookController.addSlokOrMantraToChapter
// );


// Delete a book (protected)
router.delete(
  "/delete-book/:bookId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  // authorizeRoute(),
  BookController.deleteBook
);

export const BookRoutes = router;
