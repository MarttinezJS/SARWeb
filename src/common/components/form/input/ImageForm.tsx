import { useController, useFormContext, type FieldValues } from "react-hook-form";
import { FileUploadZone } from "../../atomics";
import type { FieldProps } from "./InputForm";

interface ImageFormProps<T extends FieldValues> extends FieldProps<T> {
  defaultImageUrl?: string | null;
  text?: string;
  fit?: "contain" | "cover";
}

/** Subida de imagen (tipo y 10 MB validados) conectada al formulario. */
export const ImageForm = <T extends FieldValues>({
  name,
  label,
  rules,
  isDisabled,
  defaultImageUrl,
  text,
  fit,
}: ImageFormProps<T>) => {
  const { setError, clearErrors } = useFormContext<T>();
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController<T>({ name, rules });
  return (
    <FileUploadZone
      label={label}
      value={(value as File | null | undefined) ?? null}
      onChange={(file) => {
        clearErrors(name);
        onChange(file);
        onBlur();
      }}
      onReject={(message) => setError(name, { type: "validate", message })}
      defaultImageUrl={defaultImageUrl}
      text={text}
      fit={fit}
      isRequired={Boolean(rules?.required)}
      isDisabled={isDisabled}
      errorMessage={fieldState.error?.message}
    />
  );
};
