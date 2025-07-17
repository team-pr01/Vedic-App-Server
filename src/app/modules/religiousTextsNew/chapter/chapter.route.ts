import express from "express";
import { ChapterController } from "./chapter.controller";
import auth from "../../../middlewares/auth";
import { UserRole } from "../../auth/auth.constannts";

const router = express.Router();

// Create a new chapter (protected: admin, moderator, super-admin)
router.post(
  "/create-chapter",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  ChapterController.createChapter
);

// Get all chapters (public)
router.get("/", ChapterController.getAllChapters);

// Get a single chapter by ID (public)
router.get("/:chapterId", ChapterController.getSingleChapter);

// Update a chapter (protected)
router.put(
  "/update-chapter/:chapterId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  ChapterController.updateChapter
);

// Delete a chapter (protected)
router.delete(
  "/delete-chapter/:chapterId",
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  ChapterController.deleteChapter
);

export const ChapterRoutes = router;
