import { Switch } from "@heroui/switch";
import { useController, type FieldValues } from "react-hook-form";
import type { FieldProps } from "./InputForm";

/** Interruptor de HeroUI conectado al formulario (dentro de CustomForm). */
export const SwitchForm = <T extends FieldValues>({
  name,
  label,
  rules,
  description,
  isDisabled,
}: FieldProps<T>) => {
  const {
    field: { ref, value, onChange, onBlur },
  } = useController<T>({ name, rules });
  return (
    <div className="rounded-xl border border-secondary/20 bg-white px-3 py-2.5">
      <Switch
        ref={ref}
        name={name}
        isSelected={Boolean(value)}
        onValueChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
        color="success"
        size="sm"
        classNames={{ label: "text-sm font-medium text-secondary" }}
      >
        {label}
      </Switch>
      {description && <p className="mt-1 text-xs text-muted">{description}</p>}
    </div>
  );
};
