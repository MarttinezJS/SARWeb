import { Textarea } from "@heroui/react";
import { ReactNode } from "react";
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

interface AreaFormProps<T extends FieldValues> {
  label: string;
  icon?: ReactNode;
  registerReturn: UseFormRegisterReturn<Path<T>>;
  fullWidth?: boolean;
}

export const AreaForm = <T extends FieldValues>({
  label,
  registerReturn,
  fullWidth,
  icon,
}: AreaFormProps<T>) => {
  const { setValue } = useFormContext();
  return (
    <Controller
      name={registerReturn.name}
      disabled={registerReturn.disabled}
      render={({ fieldState, ...state }) => {
        return (
          <Textarea
            radius="lg"
            disableAutosize
            startContent={icon}
            isMultiline
            variant="bordered"
            size="sm"
            classNames={{
              input: "resize-y min-h-[400px]",
            }}
            fullWidth={fullWidth}
            labelPlacement="inside"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onValueChange={(value) => setValue(state.field.name, value as any)}
            label={label}
            color="secondary"
            className="w-full my-2 "
          />
        );
      }}
    />
  );
};
