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
exports.AiServices = exports.translateNews = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const openai_1 = require("../../utils/openai");
const news_model_1 = __importDefault(require("../news/news.model"));
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
const translateNews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { newsId, title, content, tags, category, batchLanguages } = payload;
    // Input text for GPT
    const inputText = `Title: ${title}
Content: ${content}
Tags: ${tags.join(", ")}
Category: ${category}`;
    // GPT prompt
    const systemMessage = `
You are a professional translator.
Translate the following news into exactly ${batchLanguages.length} languages provided.
Output JSON in the following format:

{
${batchLanguages
        .map((lang) => `  "${lang.code}": { "title": "...", "content": "...", "tags": [...], "category": "..." }`)
        .join(",\n")}
}

Only include the languages listed in this fixed list:
${batchLanguages.map((lang) => `${lang.code} (${lang.name})`).join(", ")}
`;
    // Call GPT
    const response = yield openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: inputText },
        ],
        temperature: 0,
        max_tokens: 4000,
    });
    const contentRes = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
    let translations;
    try {
        translations = JSON.parse(contentRes || "{}");
    }
    catch (err) {
        throw new AppError_1.default(500, "Failed to parse translations. GPT response: " + contentRes);
    }
    const missingLanguages = batchLanguages.filter((lang) => !translations[lang.code]);
    if (missingLanguages.length > 0) {
        throw new AppError_1.default(500, `GPT did not return translations for: ${missingLanguages
            .map((l) => l.name)
            .join(", ")}`);
    }
    const setObj = {};
    for (const [code, value] of Object.entries(translations)) {
        const v = value;
        setObj[`translations.${code}`] = {
            title: v.title || "",
            content: v.content || "",
            tags: v.tags || [],
            category: v.category || category,
        };
    }
    // Update News safely
    const updatedNews = yield news_model_1.default.findByIdAndUpdate(newsId, { $set: setObj }, { new: true, runValidators: true });
    if (!updatedNews)
        throw new AppError_1.default(404, "News not found");
    return updatedNews;
});
exports.translateNews = translateNews;
exports.AiServices = {
    aiChat,
    translateShloka,
    generateRecipe,
    generateQuiz,
    translateNews: exports.translateNews,
};
