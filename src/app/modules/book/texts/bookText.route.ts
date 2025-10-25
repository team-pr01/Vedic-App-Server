import express from "express";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";
import { BookTextController } from "./bookText.controller";
import authorizeRoute from "../../../middlewares/authorizeRoute";

const router = express.Router();

// Create a new book text
router.post(
  "/add",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  BookTextController.createBookText
);

// Get all book texts
router.get("/", BookTextController.getAllBookTexts);

router.get("/find-by-details", BookTextController.getBookTextByDetails);

router.get("/filter", BookTextController.filterBookTexts);

// Get all book texts by bookId
router.get("/:bookId", BookTextController.getAllBookTextsByBookId);

// Get a single book text by ID
router.get("/:bookTextId", BookTextController.getSingleBookText);

// Update a text translations
router.put(
  "/update/:bookTextId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  BookTextController.updateTranslations
);

// Update a book text by ID
router.put(
  "/update/text/:bookTextId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  BookTextController.updateTranslations
);

// Delete a book text by ID
router.delete(
  "/delete/:bookTextId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  BookTextController.deleteBookText
);

export const BookTextRoutes = router;
