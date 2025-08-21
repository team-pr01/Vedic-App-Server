import { openai } from "../../utils/openai";

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

const generateQuiz = async (topic: string, count: number) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a quiz master. Generate multiple choice questions with 4 options and correct answers.",
      },
      {
        role: "user",
        content: `Create ${count} quiz questions about ${topic}.`,
      },
    ],
  });

  return response.choices[0].message?.content;
};

export const AiServices = {
  aiChat,
  translateShloka,
  generateRecipe,
  generateQuiz,
};
