export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface IQuiz {
  title: string;
  description?: string;
  questions: IQuestion[];
}