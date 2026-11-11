import { useState, type ReactNode } from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

interface ActionButtonProps {
  label: string;
  color?: "secondary" | "default" | "primary" | "success" | "warning" | "danger";
  action: () => void | Promise<void>;
  icon: ReactNode;
  disabled?: boolean;
  disabledReason?: string;
}

/** Botón de icono para las acciones de una fila, con tooltip y estado de carga. */
export const ActionButton = ({
  label,
  color = "secondary",
  action,
  icon,
  disabled,
  disabledReason,
}: ActionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const title = disabled && disabledReason ? `${label}: ${disabledReason}` : label;
  return (
    <Tooltip content={title} delay={300} closeDelay={0}>
      {/* El span mantiene el tooltip aunque el botón esté deshabilitado. */}
      <span className="inline-flex">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color={color}
          aria-label={title}
          isDisabled={disabled}
          isLoading={loading}
          className="text-lg"
          onPress={async () => {
            setLoading(true);
            try {
              await action();
            } finally {
              setLoading(false);
            }
          }}
        >
          {icon}
        </Button>
      </span>
    </Tooltip>
  );
};
