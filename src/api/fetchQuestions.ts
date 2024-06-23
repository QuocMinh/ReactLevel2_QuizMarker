import { API_URL } from "@constants/url-settings";
import { EMPTY_ARRAY, EMPTY_STRING, ONE, ZERO } from "@constants/variables";
import { Question } from "@models/QuestionModel";
import { shuffle } from "lodash";

const AMOUNT_DEFAULT = "5";
const TYPE_DEFAULT = "multiple";

export const fetchQuestions = async (category: string, difficulty: string) => {
  const respData = await fetch(
    API_URL.GET_QUESTIONS.replace("[amount]", AMOUNT_DEFAULT)
      .replace("[type]", TYPE_DEFAULT)
      .replace("[category]", category)
      .replace("[difficulty]", difficulty)
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.response_code !== ZERO) {
        // TODO: show message error
        return EMPTY_ARRAY;
      }
      const shuffleQuestions = shuffle(data.results);
      shuffleQuestions.forEach((question, index) => {
        question.id = index + ONE;
        question.user_answer = EMPTY_STRING;
        question.shuffled_answers = shuffle([
          question.correct_answer,
          ...question.incorrect_answers,
        ]);
      });
      return shuffleQuestions as Question[];
    })
    .catch((error) => {
      console.log("@fetchQuestions ~ error", error);
      return EMPTY_ARRAY;
    });

  return respData;
};
