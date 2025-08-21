"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const router = express_1.default.Router();
router.post("/chat", ai_controller_1.AiControllers.aiChat);
router.post("/translate-shloka", ai_controller_1.AiControllers.translateShloka);
router.post("/generate-recipe", ai_controller_1.AiControllers.generateRecipe);
router.post("/generate-quiz", ai_controller_1.AiControllers.generateQuiz);
exports.AiRoutes = router;
