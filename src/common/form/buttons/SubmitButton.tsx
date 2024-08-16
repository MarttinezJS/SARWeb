import { Button, type ButtonProps } from "@nextui-org/react";
import React, { useEffect, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";

interface SubmitButtonProps {
  submitButtonProps?: ButtonProps;
  label?: string;
  icon?: ReactNode;
}

export const SubmitButton = ({
  submitButtonProps,
  label,
  icon,
}: SubmitButtonProps) => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();
  useEffect(() => {}, [isSubmitting]);
  return (
    <Button
      type="submit"
      color="primary"
      startContent={icon ?? <FaRegSave />}
      {...submitButtonProps}
      isDisabled={submitButtonProps?.disabled == true || isSubmitting}
      isLoading={isSubmitting}
    >
      {isSubmitting ? "Enviando..." : label ?? "Guardar"}
    </Button>
  );
};
