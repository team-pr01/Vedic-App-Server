import { Schema, model } from "mongoose";

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IQuiz {
  title: string;
  description?: string;
  questions: IQuestion[];
  createdBy: string; // Admin ID
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

const Quiz = model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
