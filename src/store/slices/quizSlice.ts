import { Question } from "@models/QuestionModel";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type InitState = {
  questions: Question[];
};

const initialState: InitState = {
  questions: [],
};

const quizSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    updateUserAnswer: (state, action: PayloadAction) => {
      // TODO:
    },
  },
});
const appState = (state: RootState) => state.quiz;

export const { updateUserAnswer, saveQuestions } = quizSlice.actions;

export const quizSelector = {
  questions: createSelector(appState, (app) => app.questions),
};

export default quizSlice.reducer;
