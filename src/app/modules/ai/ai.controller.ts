import httpStatus from "http-status";
import { AiServices } from "./ai.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";

// AI Chat Controller
const aiChat = catchAsync(async (req, res) => {
  const { message } = req.body;

  const result = await AiServices.aiChat(message);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AI response generated successfully",
    data: result,
  });
});

const translateShloka = catchAsync(async (req, res) => {
  const { text, targetLang } = req.body;
  const result = await AiServices.translateShloka(text, targetLang);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shloka translated successfully",
    data: result,
  });
});

const generateRecipe = catchAsync(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    throw new AppError(httpStatus.BAD_REQUEST, "Command is required");
  }

  const result = await AiServices.generateRecipe(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Recipe generated successfully",
    data: result,
  });
});

const generateQuiz = catchAsync(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new AppError(httpStatus.BAD_REQUEST, "Title is required");
  }

  const newQuiz = await AiServices.generateQuiz(title);

  if (!newQuiz) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to generate quiz"
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz generated and saved successfully",
    data: newQuiz,
  });
});

export const AiControllers = {
  aiChat,
  translateShloka,
  generateRecipe,
  generateQuiz,
};
