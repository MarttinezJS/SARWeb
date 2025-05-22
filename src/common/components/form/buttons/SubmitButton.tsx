import { Button, CircularProgress, type ButtonProps } from "@heroui/react";
import { useEffect, type ReactNode } from "react";
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
    formState: { isSubmitting },
  } = useFormContext();
  useEffect(() => {}, [isSubmitting]);
  return (
    <Button
      type="submit"
      color="primary"
      startContent={isSubmitting ? <CircularProgress /> : icon ?? <FaRegSave />}
      {...submitButtonProps}
      isDisabled={submitButtonProps?.disabled == true || isSubmitting}
      isLoading={isSubmitting}
    >
      {isSubmitting ? "Enviando..." : label ?? "Guardar"}
    </Button>
  );
};
