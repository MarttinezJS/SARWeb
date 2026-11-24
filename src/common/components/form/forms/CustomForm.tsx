import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { SubmitButton } from "../buttons";
import type { Response } from "../../../../models";

interface CustomFormProps<REQ extends FieldValues> {
  /** Devuelve la respuesta de la API: si no hay error, el formulario se limpia. */
  onSubmit: (data: REQ, form: UseFormReturn<REQ>) => Promise<Response<unknown> | undefined | void>;
  children: ReactNode | ((form: UseFormReturn<REQ>) => ReactNode);
  defaultValues?: DefaultValues<REQ>;
  submitLabel?: string;
  loadingLabel?: string;
  submitIcon?: ReactNode;
  /** Botones extra junto al de enviar (p. ej. "Cancelar"). */
  actions?: ReactNode;
  /** Limpiar los campos tras un envío correcto (por defecto sí). */
  resetOnSuccess?: boolean;
  submitFullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Formulario base con react-hook-form: valida al salir de cada campo, evita
 * envíos dobles y expone el contexto a InputForm, AreaForm, SwitchForm, etc.
 */
export const CustomForm = <REQ extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  submitLabel,
  loadingLabel,
  submitIcon,
  actions,
  resetOnSuccess = true,
  submitFullWidth = false,
  className,
  "aria-label": ariaLabel,
}: CustomFormProps<REQ>) => {
  const form = useForm<REQ>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        noValidate
        aria-label={ariaLabel}
        onSubmit={form.handleSubmit(async (data) => {
          const resp = await onSubmit(data, form);
          if (resetOnSuccess && resp && resp.error === false) form.reset();
        })}
        className={className ?? "w-full"}
      >
        {typeof children === "function" ? children(form) : children}
        <div
          className={
            submitFullWidth ? "mt-5 flex flex-col gap-2" : "mt-5 flex flex-wrap justify-end gap-2"
          }
        >
          {actions}
          <SubmitButton
            label={submitLabel}
            loadingLabel={loadingLabel}
            icon={submitIcon}
            fullWidth={submitFullWidth}
          />
        </div>
      </form>
    </FormProvider>
  );
};
