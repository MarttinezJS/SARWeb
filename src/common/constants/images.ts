/** Mismos límites que valida el backend al subir imágenes. */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const IMAGE_ACCEPT: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
  "image/svg+xml": [".svg"],
};

export const IMAGE_HINT = "JPG, PNG, WEBP, GIF, AVIF o SVG. Máximo 10 MB.";
