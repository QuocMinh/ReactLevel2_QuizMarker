export type Question = {
  id: string;
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_answer?: string;
};
