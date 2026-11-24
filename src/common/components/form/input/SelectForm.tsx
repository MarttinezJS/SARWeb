import { Select, SelectItem } from "@heroui/select";
import { useController, type FieldValues } from "react-hook-form";
import type { FieldProps } from "./InputForm";

interface SelectFormProps<T extends FieldValues> extends FieldProps<T> {
  options: { key: string; label: string }[];
}

/** Lista desplegable de HeroUI conectada al formulario (dentro de CustomForm). */
export const SelectForm = <T extends FieldValues>({
  name,
  label,
  rules,
  description,
  isDisabled,
  options,
}: SelectFormProps<T>) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState,
  } = useController<T>({ name, rules });
  return (
    <Select
      ref={ref}
      name={name}
      label={label}
      labelPlacement="outside-top"
      placeholder="Selecciona una opción"
      description={description}
      variant="bordered"
      radius="md"
      color="secondary"
      disallowEmptySelection
      selectedKeys={value ? [String(value)] : []}
      onSelectionChange={(keys) => onChange(keys.currentKey ?? value)}
      onBlur={onBlur}
      isRequired={Boolean(rules?.required)}
      isDisabled={isDisabled}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior="aria"
      classNames={{ label: "font-medium text-secondary!", trigger: "bg-white" }}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};
