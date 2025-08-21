import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { QuizController } from "./quiz.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";

const router = express.Router();

// Admin Routes
router.post("/add", auth(UserRole.admin), authorizeRoute(), QuizController.addQuiz);
router.get("/", QuizController.getAllQuizzes);
router.patch("/update/:id", auth(UserRole.admin), QuizController.updateQuiz);
router.delete("/delete/:id", auth(UserRole.admin), QuizController.deleteQuiz);

// User Routes
router.get("/:id",  QuizController.getQuiz);
router.post("/participate/:id", auth(), QuizController.participateQuiz);

export const QuizRoutes = router;