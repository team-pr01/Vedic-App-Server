/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from "../../utils/openai";
import Quiz from "../quiz/quiz.model";

const aiChat = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });

  return completion.choices[0].message?.content || "No response";
};

const translateShloka = async (text: string, targetLang: string) => {
  const response = await openai.chat.completions.create({
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

  return response.choices[0].message?.content;
};

const generateRecipe = async (query: string) => {
  const response = await openai.chat.completions.create({
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

  return response.choices[0]?.message?.content || "Could not generate recipe";
};

const generateQuiz = async (title: string) => {
  const response = await openai.chat.completions.create({
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

  let content = response.choices[0]?.message?.content || "[]";

  // strip ```json ... ```
  content = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  let questions: any[] = [];
  try {
    questions = JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse AI response:", content, error);
    return null;
  }

  if (!questions || questions.length === 0) {
    return null;
  }

  // 🛠 Save to DB inside service
  const newQuiz = await Quiz.create({ title, questions });

  return newQuiz;
};

export const AiServices = {
  aiChat,
  translateShloka,
  generateRecipe,
  generateQuiz,
};
