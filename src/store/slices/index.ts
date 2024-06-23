import appReducer from "@store/slices/appSlice";
import quizReducer from "@store/slices/quizSlice";

export default {
  app: appReducer,
  quiz: quizReducer,
};
