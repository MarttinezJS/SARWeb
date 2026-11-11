import { useState, type ReactNode } from "react";
import { Input } from "@heroui/input";
import {
  useController,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
  description?: string;
  isDisabled?: boolean;
}

interface InputFormProps<T extends FieldValues> extends FieldProps<T> {
  type?: "email" | "text" | "password" | "tel" | "url";
  icon?: ReactNode;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email" | "tel" | "url";
  maxLength?: number;
  /** Campo numérico (NIT, teléfono): teclado numérico en móvil; lo valida `rules`. */
  onlyDigits?: boolean;
}

/** Campo de texto de HeroUI conectado al formulario (dentro de CustomForm). */
export const InputForm = <T extends FieldValues>({
  name,
  label,
  rules,
  description,
  isDisabled,
  type = "text",
  icon,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  onlyDigits,
}: InputFormProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    field: { ref, value, onChange, onBlur },
    fieldState,
  } = useController<T>({ name, rules });
  const isPassword = type === "password";

  return (
    <Input
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
      type={isPassword && isVisible ? "text" : type}
      inputMode={onlyDigits ? "numeric" : inputMode}
      maxLength={maxLength}
      autoComplete={autoComplete}
      isRequired={Boolean(rules?.required)}
      isDisabled={isDisabled}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior="aria"
      startContent={icon}
      classNames={{ label: "font-medium text-secondary!", inputWrapper: "bg-white" }}
      endContent={
        isPassword && (
          <button
            type="button"
            className="rounded-md p-1 text-xl text-muted"
            onClick={() => setIsVisible(!isVisible)}
            aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={isVisible}
          >
            {isVisible ? <BsEyeSlash aria-hidden="true" /> : <BsEye aria-hidden="true" />}
          </button>
        )
      }
    />
  );
};
