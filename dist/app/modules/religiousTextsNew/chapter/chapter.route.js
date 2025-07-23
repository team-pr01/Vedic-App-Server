"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chapter_controller_1 = require("./chapter.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const auth_constannts_1 = require("../../auth/auth.constannts");
const router = express_1.default.Router();
// Create a new chapter (protected: admin, moderator, super-admin)
router.post("/create-chapter", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), chapter_controller_1.ChapterController.createChapter);
// Get all chapters (public)
router.get("/", chapter_controller_1.ChapterController.getAllChapters);
// Get a single chapter by ID (public)
router.get("/:chapterId", chapter_controller_1.ChapterController.getSingleChapter);
// Update a chapter (protected)
router.put("/update-chapter/:chapterId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), chapter_controller_1.ChapterController.updateChapter);
// Delete a chapter (protected)
router.delete("/delete-chapter/:chapterId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.moderator, auth_constannts_1.UserRole["super-admin"]), chapter_controller_1.ChapterController.deleteChapter);
exports.ChapterRoutes = router;
