import { PageHeader } from "@components/PageHeader";
import { ROUTES } from "@constants/route-settings";
import { quizSelector } from "@store/slices/quizSlice";
import { FC, Fragment, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { QuestionsForm } from "../../partials";
import { CreateQuizForm } from "./components";
import { ColorTypes } from "@constants/variables";

export const QuizMarkerPage: FC = memo(() => {
  const navigate = useNavigate();

  const isFinishQuiz: boolean = useSelector(quizSelector.isFinishQuiz);

  const handleSubmit = useCallback(() => {
    navigate(ROUTES.RESULT_PAGE);
  }, [navigate]);

  return (
    <Fragment>
      <PageHeader title="QUIZ MARKER" />

      <CreateQuizForm />

      <QuestionsForm mode="create" />

      {isFinishQuiz && (
        <Button
          color={ColorTypes.Primary}
          block
          className="my-4"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </Fragment>
  );
});
