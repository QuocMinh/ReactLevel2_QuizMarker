import { DIFFICULTY_OPTIONS } from "@constants/variables";
import { Category } from "@models/CategoryModel";
import { FC, Fragment, memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Input } from "reactstrap";

export const CreateQuizForm: FC = memo(() => {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm({
    defaultValues: {},
  });

  const getCategories = useCallback(() => {
    setCategories([]);
  }, []);

  return (
    <Fragment>
      <FormProvider {...form}>
        <h3 className="text-center mt-4">QUIZ MARKER</h3>

        <div className="input-group mt-4">
          <Input id="categorySelect" name="categorySelect" type="select">
            <option value="" selected disabled>
              Select a category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Input>

          <Input id="difficultySelect" name="difficultySelect" type="select">
            <option value="" selected disabled>
              Select difficulty
            </option>

            {DIFFICULTY_OPTIONS.map((difficulty) => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </Input>

          <Button color="secondary" outline>
            Create
          </Button>
        </div>
      </FormProvider>
    </Fragment>
  );
});
