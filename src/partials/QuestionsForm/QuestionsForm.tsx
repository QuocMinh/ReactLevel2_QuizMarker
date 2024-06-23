import { quizSelector, updateUserAnswer } from "@store/slices/quizSlice";
import { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionsItem } from "./QuestionsItem";

type QuestionsFormProps = {
  mode: "create" | "view";
  onSelect?: () => void;
};

export const QuestionsForm: FC<QuestionsFormProps> = memo(({ mode }) => {
  const dispatch = useDispatch();
  const questions = useSelector(quizSelector.questions);

  const handleSelectAnswer = useCallback(
    (questionId: number, userAnswer: string) => {
      dispatch(
        updateUserAnswer({
          questionId,
          userAnswer,
        })
      );
    },
    [dispatch]
  );

  return (
    <div>
      {questions.map((question) => (
        <QuestionsItem
          key={question.id}
          mode={mode}
          data={question}
          onSelect={handleSelectAnswer}
        />
      ))}
    </div>
  );
});
