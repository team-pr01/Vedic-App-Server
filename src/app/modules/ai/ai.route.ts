import express from "express";
import { AiControllers } from "./ai.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { checkAiChatLimit } from "../../middlewares/checkLimit";

const router = express.Router();

router.post("/chat", auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), checkAiChatLimit, AiControllers.aiChat);
router.post("/translate-shloka", auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.translateShloka);
router.post("/generate-recipe",auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.generateRecipe);
router.post("/generate-quiz",auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.generateQuiz);
router.post("/translate-news",auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.translateNews);
router.post("/generate-kundli",auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.generateKundli);
router.post("/generate-muhurta",auth( UserRole.user , UserRole.temple, UserRole.admin, UserRole.moderator, UserRole["super-admin"]), AiControllers.generateMuhurta);


export const AiRoutes = router;