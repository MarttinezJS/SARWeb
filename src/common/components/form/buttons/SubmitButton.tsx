import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@heroui/button";
import { useFormContext } from "react-hook-form";

interface SubmitButtonProps extends Omit<ButtonProps, "type" | "isLoading" | "children"> {
  label?: string;
  loadingLabel?: string;
  icon?: ReactNode;
}

/** Botón de envío que se bloquea y muestra carga mientras el formulario envía. */
export const SubmitButton = ({
  label = "Guardar",
  loadingLabel = "Enviando…",
  icon,
  ...props
}: SubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      color="secondary"
      startContent={isSubmitting ? undefined : icon}
      {...props}
      type="submit"
      isLoading={isSubmitting}
    >
      {isSubmitting ? loadingLabel : label}
    </Button>
  );
};
