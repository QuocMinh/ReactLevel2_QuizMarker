import { fetchCategories } from "@api/fetchCategories";
import { fetchQuestions } from "@api/fetchQuestions";
import { SelectControl, SelectOption } from "@components/SelectControl";
import {
  ColorTypes,
  DIFFICULTY_OPTIONS,
  EMPTY_STRING,
  ZERO,
} from "@constants/variables";
import { saveQuestions } from "@store/slices/quizSlice";
import { loadingScreen } from "@utils/redux.utils";
import { FC, Fragment, memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { FormField } from "../models";

export const CreateQuizForm: FC = memo(() => {
  const dispatch = useDispatch();

  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);

  const form = useForm({
    defaultValues: {
      [FormField.CategorySelect]: EMPTY_STRING,
      [FormField.DifficultySelect]: EMPTY_STRING,
    },
  });

  const { getValues } = form;

  useEffect(() => {
    const getCategories = async () => {
      loadingScreen.show();
      const categories = await fetchCategories();
      loadingScreen.hide();

      if (!categories) {
        return;
      }

      setCategoryOptions(
        categories.map((data) => ({ value: data.id, label: data.name }))
      );
    };

    getCategories();
  }, []);

  const handleCreate = useCallback(async () => {
    const formValues = getValues();
    loadingScreen.show();

    const questions = await fetchQuestions(
      formValues[FormField.CategorySelect],
      formValues[FormField.DifficultySelect]
    );

    if (questions.length > ZERO) {
      dispatch(saveQuestions(questions));
    }

    loadingScreen.hide();
  }, [dispatch, getValues]);

  return (
    <Fragment>
      <FormProvider {...form}>
        <div className="input-group mt-4">
          <SelectControl
            id={FormField.CategorySelect}
            name={FormField.CategorySelect}
            options={categoryOptions}
            placeholder="Select a category"
          />

          <SelectControl
            id={FormField.DifficultySelect}
            name={FormField.DifficultySelect}
            options={DIFFICULTY_OPTIONS}
            placeholder="Select difficulty"
          />

          <Button color={ColorTypes.Secondary} outline onClick={handleCreate}>
            Create
          </Button>
        </div>
      </FormProvider>
    </Fragment>
  );
});
