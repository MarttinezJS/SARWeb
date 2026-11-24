import { Textarea } from "@heroui/input";
import { useController, type FieldValues } from "react-hook-form";
import type { FieldProps } from "./InputForm";

interface AreaFormProps<T extends FieldValues> extends FieldProps<T> {
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
}

/** Área de texto de HeroUI conectada al formulario (dentro de CustomForm). */
export const AreaForm = <T extends FieldValues>({
  name,
  label,
  rules,
  description,
  isDisabled,
  placeholder,
  minRows = 3,
  maxRows = 12,
  maxLength,
}: AreaFormProps<T>) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState,
  } = useController<T>({ name, rules });
  return (
    <Textarea
      ref={ref}
      name={name}
      value={(value as string | undefined) ?? ""}
      onValueChange={onChange}
      onBlur={onBlur}
      label={label}
      labelPlacement="outside-top"
      placeholder={placeholder}
      description={description}
      variant="bordered"
      radius="md"
      color="secondary"
      minRows={minRows}
      maxRows={maxRows}
      maxLength={maxLength}
      isRequired={Boolean(rules?.required)}
      isDisabled={isDisabled}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior="aria"
      classNames={{ label: "font-medium text-secondary!", inputWrapper: "bg-white" }}
    />
  );
};
