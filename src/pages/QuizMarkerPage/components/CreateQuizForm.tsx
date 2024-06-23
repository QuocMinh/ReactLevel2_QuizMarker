import { PageHeader } from "@components/PageHeader";
import { SelectControl, SelectOption } from "@components/SelectControl";
import { API_URL } from "@constants/url-settings";
import { DIFFICULTY_OPTIONS, EMPTY_STRING } from "@constants/variables";
import { Category } from "@models/CategoryModel";
import { loadingScreen } from "@utils/redux.utils";
import { FC, Fragment, memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "reactstrap";
import { FormField } from "../models";

export const CreateQuizForm: FC = memo(() => {
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
      const respData = await fetch(API_URL.GET_CATEGORIES)
        .then((response) => response.json())
        .then((data) => data.trivia_categories as Category[])
        .catch((error) => {
          console.log("@getCategories ~ error", error);
          return null;
        });
      loadingScreen.hide();

      if (!respData) {
        return;
      }

      setCategoryOptions(
        respData.map((data) => ({ value: data.id, label: data.name }))
      );
    };

    getCategories();
  }, []);

  const handleCreate = useCallback(() => {
    const formValues = getValues();
    console.log("@handleCreate ~ formValues", formValues);
    // TODO: Handle create quiz here
  }, [getValues]);

  return (
    <Fragment>
      <PageHeader title="QUIZ MARKER" />

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

          <Button color="secondary" outline onClick={handleCreate}>
            Create
          </Button>
        </div>
      </FormProvider>
    </Fragment>
  );
});
