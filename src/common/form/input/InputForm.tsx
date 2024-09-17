import { Input } from "@nextui-org/react";
import { useState, type ReactNode } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface InputFormProps<T extends FieldValues> {
  label: string;
  type?: "email" | "text" | "number" | "password";
  icon?: ReactNode;
  registerReturn: UseFormRegisterReturn<Path<T>>;
}

export const InputForm = <T extends FieldValues>({
  label,
  type = "text",
  icon,
  registerReturn,
}: InputFormProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setValue } = useFormContext();
  return (
    <Controller
      name={registerReturn.name}
      disabled={registerReturn.disabled}
      render={({ fieldState, ...state }) => {
        return (
          <Input
            radius="lg"
            startContent={icon}
            variant="bordered"
            size="sm"
            labelPlacement="inside"
            endContent={
              type == "password" && (
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  aria-label="Cambiar visibilidad de la contraseña"
                >
                  {isVisible ? (
                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              )
            }
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onValueChange={(value) => setValue(state.field.name, value as any)}
            type={type == "password" ? (isVisible ? "text" : type) : type}
            label={label}
            color="secondary"
            className="w-full my-2 "
          />
        );
      }}
    />
  );
};
