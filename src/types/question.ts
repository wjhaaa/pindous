export interface Question {
  id: string;
  title: string;
  type: "single" | "qa";
  options?: string[];
  answer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
  category: string;
}

export interface UserProgress {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  favoriteCount: number;
  consecutiveDays: number;
  todayCount: number;
}

export interface QuizSession {
  questions: Question[];
  currentIndex: number;
  answers: Map<string, string>;
  isWrong: Map<string, boolean>;
  isFavorite: Map<string, boolean>;
}
