import { EMPTY_STRING, ZERO } from "@constants/variables";
import { Question } from "@models/QuestionModel";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type UserAnswer = {
  questionId: number;
  userAnswer: string;
};

type UserAnswers = {
  [questionId: number]: UserAnswer;
};

type InitState = {
  questions: Question[];
  userAnswers: UserAnswers;
};

const initialState: InitState = {
  questions: [],
  userAnswers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    saveQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.userAnswers = initialState.userAnswers;
    },
    updateUserAnswer: ({ userAnswers }, action: PayloadAction<UserAnswer>) => {
      userAnswers[action.payload.questionId] = action.payload;
    },
    resetQuiz: (state) => {
      state.questions = initialState.questions;
      state.userAnswers = initialState.userAnswers;
    },
  },
});
const appState = (state: RootState) => state.quiz;

export const { updateUserAnswer, saveQuestions, resetQuiz } = quizSlice.actions;

export const quizSelector = {
  questions: createSelector(appState, ({ questions }) => questions),
  userAnswer: (questionId: number) =>
    createSelector(
      appState,
      ({ userAnswers }) => userAnswers[questionId]?.userAnswer ?? EMPTY_STRING
    ),
  isFinishQuiz: createSelector(
    appState,
    ({ questions, userAnswers }) =>
      questions.length > ZERO &&
      questions.length === Object.keys(userAnswers).length
  ),
  finalScore: createSelector(appState, ({ questions, userAnswers }) => {
    const numOfCorrect = questions.filter(
      (question) =>
        question.correct_answer === userAnswers[question.id].userAnswer
    ).length;
    return { numOfCorrect, total: questions.length };
  }),
};

export default quizSlice.reducer;
