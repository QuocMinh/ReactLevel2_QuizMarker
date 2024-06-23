import { API_URL } from "@constants/url-settings";
import { EMPTY_ARRAY, EMPTY_STRING, ONE, ZERO } from "@constants/variables";
import { QuestionModel } from "@models/QuestionModel";
import { messageArea } from "@utils/redux.utils";
import { shuffle } from "lodash";

const AMOUNT_DEFAULT = "5";
const TYPE_DEFAULT = "multiple";

export const fetchQuestions = async (category: string, difficulty: string) => {
  messageArea.clear();

  const respData = await fetch(
    API_URL.GET_QUESTIONS.replace("[amount]", AMOUNT_DEFAULT)
      .replace("[type]", TYPE_DEFAULT)
      .replace("[category]", category)
      .replace("[difficulty]", difficulty)
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.response_code !== ZERO) {
        messageArea.warning(
          "Request too fast, please try again after 5 seconds"
        );
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
      return shuffleQuestions as QuestionModel[];
    })
    .catch((error) => {
      messageArea.warning(
        "An error occur: " + (error.message ?? "Undefined error")
      );
      return EMPTY_ARRAY;
    });

  return respData;
};
