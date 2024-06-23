import { PageHeader } from "@components/PageHeader";
import { ROUTES } from "@constants/route-settings";
import { ColorTypes, FIVE, ONE, THREE, ZERO } from "@constants/variables";
import { QuestionsForm } from "@partials/index";
import { quizSelector, resetQuiz } from "@store/slices/quizSlice";
import { MessageAreaType, messageArea } from "@utils/redux.utils";
import { FC, Fragment, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const QuizResultPage: FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const finalScore = useSelector(quizSelector.finalScore);

  const gotoQuizForm = useCallback(() => {
    navigate(ROUTES.ROOT_PAGE);
  }, [navigate]);

  const handleClickCreate = useCallback(() => {
    dispatch(resetQuiz());
    gotoQuizForm();
  }, [dispatch, gotoQuizForm]);

  const finalScoreType: MessageAreaType = useMemo(() => {
    if (finalScore.numOfCorrect <= ONE) {
      return "error";
    } else if (finalScore.numOfCorrect <= THREE) {
      return "warning";
    } else if (finalScore.numOfCorrect <= FIVE) {
      return "success";
    } else {
      return "default";
    }
  }, [finalScore]);

  useEffect(() => {
    if (finalScore.total === ZERO) {
      gotoQuizForm();
      return;
    }

    // Show final score
    messageArea[finalScoreType](
      `You scored ${finalScore.numOfCorrect} out of ${finalScore.total}`
    );

    return () => {
      messageArea.clear();
    };
  }, [finalScore.numOfCorrect, finalScore.total, finalScoreType, gotoQuizForm]);

  return (
    <Fragment>
      <PageHeader title="QUIZ RESULT" />

      <QuestionsForm mode="view" />

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
