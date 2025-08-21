import { Schema, model } from "mongoose";
import { IQuestion, IQuiz } from "./quiz.interface";

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const QuizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
