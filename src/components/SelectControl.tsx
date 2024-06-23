import { EMPTY_STRING } from "@constants/variables";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "reactstrap";

export type SelectOption = {
  value: string | number;
  label: string | number;
};

export type SelectControlProps = {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
};

export const SelectControl: FC<SelectControlProps> = ({
  id,
  name,
  options,
  placeholder,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ref } }) => (
        <Input id={id} name={name} type="select" onChange={onChange} ref={ref}>
          <option value={EMPTY_STRING}>
            {`-- ${placeholder} --` ?? "-- Select an item --"}
          </option>

          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </Input>
      )}
    />
  );
};
