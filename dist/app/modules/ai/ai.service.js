"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const openai_1 = require("../../utils/openai");
const quiz_model_1 = __importDefault(require("../quiz/quiz.model"));
const aiChat = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const completion = yield openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
    });
    return ((_a = completion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "No response";
});
const translateShloka = (text, targetLang) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a Vedic scholar who translates Sanskrit shlokas into ${targetLang}. 
                  Provide meaning in a simple, clear way.`,
            },
            { role: "user", content: text },
        ],
    });
    return (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
});
const generateRecipe = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const response = yield openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are a professional chef with expertise in global cuisines. 
                 Provide detailed recipes with:
                 - Clear instructions
                 - Preparation time
                 - Cooking time
                 - Serving size
                 - Tips/variations when applicable`,
            },
            {
                role: "user",
                content: query,
            },
        ],
        temperature: 0.7,
        max_tokens: 1000,
    });
    return ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "Could not generate recipe";
});
const generateQuiz = (title) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const response = yield openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `You are an expert quiz generator. 
                  Respond ONLY with valid JSON.
                  Generate BETWEEN 10 and 15 questions for the given topic.
                  Format:
                  [
                    {
                      "question": "string",
                      "options": ["string","string","string","string"],
                      "correctAnswer": number (1-4)
                    }
                  ]`,
            },
            { role: "user", content: `Generate a quiz on the topic: ${title}` },
        ],
        temperature: 0.7,
        max_tokens: 1000,
    });
    let content = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "[]";
    // strip ```json ... ```
    content = content
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
    let questions = [];
    try {
        questions = JSON.parse(content);
    }
    catch (error) {
        console.error("Failed to parse AI response:", content, error);
        return null;
    }
    if (!questions || questions.length === 0) {
        return null;
    }
    // 🛠 Save to DB inside service
    const newQuiz = yield quiz_model_1.default.create({ title, questions });
    return newQuiz;
});
exports.AiServices = {
    aiChat,
    translateShloka,
    generateRecipe,
    generateQuiz,
};
