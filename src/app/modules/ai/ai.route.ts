import express from "express";
import { AiControllers } from "./ai.controller";

const router = express.Router();

router.post("/chat", AiControllers.aiChat);
router.post("/translate-shloka", AiControllers.translateShloka);
router.post("/generate-recipe", AiControllers.generateRecipe);
router.post("/generate-quiz", AiControllers.generateQuiz);
router.post("/translate-news", AiControllers.translateNews);
router.post("/generate-kundli", AiControllers.generateKundli);
router.post("/generate-muhurta", AiControllers.generateMuhurta);


export const AiRoutes = router;