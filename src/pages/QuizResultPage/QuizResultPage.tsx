import { PageHeader } from "@components/PageHeader";
import { ColorTypes, FIVE, ONE, THREE } from "@constants/variables";
import { QuestionsForm } from "@partials/index";
import { quizSelector, resetQuiz } from "@store/slices/quizSlice";
import { FC, Fragment, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { QuizScoreContainer } from "./styles";

export const QuizResultPage: FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finalScore = useSelector(quizSelector.finalScore);

  const handleClickCreate = useCallback(() => {
    dispatch(resetQuiz());
    navigate(-ONE); // Go back to Create quiz form
  }, [dispatch, navigate]);

  const scoreColor = useMemo(() => {
    if (finalScore.numOfCorrect <= ONE) {
      return "red";
    } else if (finalScore.numOfCorrect <= THREE) {
      return "yellow";
    } else if (finalScore.numOfCorrect <= FIVE) {
      return "green";
    } else {
      return "white";
    }
  }, [finalScore]);

  return (
    <Fragment>
      <PageHeader title="QUIZ RESULT" />

      <QuestionsForm mode="view" />

      <QuizScoreContainer className="mt-4" $color={scoreColor}>
        <span className="p-2">
          You scored {finalScore.numOfCorrect} out of {finalScore.total}
        </span>
      </QuizScoreContainer>

      <Button
        color={ColorTypes.Secondary}
        block
        className="my-4"
        onClick={handleClickCreate}
      >
        Create a new quiz
      </Button>
    </Fragment>
  );
});
