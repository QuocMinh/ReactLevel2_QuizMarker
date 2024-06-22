import { FC, Fragment, memo } from "react";
import { Button } from "reactstrap";
import { QuestionsForm } from "../../partials";
import { CreateQuizForm } from "./components";

export const QuizMarkerPage: FC = memo(() => {
  return (
    <Fragment>
      <CreateQuizForm />
      <QuestionsForm />
      <Button color="primary" block>
        Submit
      </Button>
    </Fragment>
  );
});
