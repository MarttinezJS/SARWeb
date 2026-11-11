type FormValue = string | number | boolean | File | null | undefined;

/**
 * Arma un multipart/form-data omitiendo los campos vacíos (null, undefined y
 * cadenas vacías), que el backend interpretaría como valores reales.
 */
export const toFormData = (values: Record<string, FormValue>): FormData => {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined || value === "") continue;
    form.append(key, value instanceof File ? value : String(value));
  }
  return form;
};
