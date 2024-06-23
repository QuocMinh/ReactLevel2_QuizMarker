import { ColorTypes } from "@constants/variables";
import { QuestionModel } from "@models/QuestionModel";
import { quizSelector } from "@store/slices/quizSlice";
import { FC, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

type QuestionsItemProps = {
  data: QuestionModel;
  mode: "create" | "view";
  onSelect?: (questionId: number, userAnswer: string) => void;
};

export const QuestionsItem: FC<QuestionsItemProps> = memo(
  ({ mode, data, onSelect }) => {
    const userAnswer = useSelector(quizSelector.userAnswer(data.id));

    const formatText = useCallback((text: string) => {
      return text.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`);
    }, []);

    const isOutline = useCallback(
      (answer: string) => {
        if (mode === "create") {
          return answer === userAnswer;
        }
        return answer === userAnswer || answer === data.correct_answer;
      },
      [data.correct_answer, mode, userAnswer]
    );

    const getColor = useCallback(
      (answer: string) => {
        if (mode === "create") {
          return ColorTypes.Success;
        }
        if (answer === data.correct_answer) {
          return ColorTypes.Success;
        }
        if (answer === userAnswer && answer !== data.correct_answer) {
          return ColorTypes.Danger;
        }
        return ColorTypes.Secondary;
      },
      [data.correct_answer, mode, userAnswer]
    );

    const onSelectAnswer = useCallback(
      (answer: string) => () => {
        onSelect?.(data.id, answer);
      },
      [data.id, onSelect]
    );

    return (
      <div className="mt-4">
        <div className="mt-2">{formatText(data.question)}</div>
        {data.shuffled_answers.map((answer) => (
          <Button
            key={answer}
            className="mt-2 me-2"
            color={getColor(answer)}
            outline={!isOutline(answer)}
            onClick={onSelectAnswer(answer)}
            disabled={mode === "view"}
          >
            {formatText(answer)}
          </Button>
        ))}
      </div>
    );
  }
);
