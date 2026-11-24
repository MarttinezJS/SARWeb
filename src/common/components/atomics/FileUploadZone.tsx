import { useEffect, useId, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { clsx } from "clsx";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IMAGE_ACCEPT, IMAGE_HINT, MAX_IMAGE_BYTES } from "../../constants";

interface FileUploadZoneProps {
  label: string;
  /** Archivo elegido (componente controlado). */
  value: File | null;
  onChange: (file: File | null) => void;
  /** Se llama cuando el archivo se rechaza por tipo o tamaño. */
  onReject?: (message: string) => void;
  /** Imagen actual (al editar) que se muestra mientras no se elija otra. */
  defaultImageUrl?: string | null;
  text?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  /** Cómo encajar la vista previa: logos completos o fotos recortadas. */
  fit?: "contain" | "cover";
}

const rejectionMessage = (rejections: FileRejection[]): string => {
  const code = rejections[0]?.errors[0]?.code;
  if (code === "file-too-large") return "La imagen supera el máximo de 10 MB.";
  if (code === "file-invalid-type")
    return "Formato no permitido. Usa JPG, PNG, WEBP, GIF, AVIF o SVG.";
  if (code === "too-many-files") return "Sube una sola imagen.";
  return "No se pudo usar ese archivo.";
};

const formatSize = (bytes: number): string =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/** Zona para arrastrar o elegir una imagen, con vista previa y validación. */
export const FileUploadZone = ({
  label,
  value,
  onChange,
  onReject,
  defaultImageUrl,
  text,
  errorMessage,
  isRequired,
  isDisabled,
  fit = "cover",
}: FileUploadZoneProps) => {
  const id = useId();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: IMAGE_ACCEPT,
    maxSize: MAX_IMAGE_BYTES,
    disabled: isDisabled,
    onDropAccepted: ([file]) => onChange(file),
    onDropRejected: (rejections) => onReject?.(rejectionMessage(rejections)),
  });

  const preview = useMemo(() => (value ? URL.createObjectURL(value) : undefined), [value]);
  useEffect(() => () => (preview ? URL.revokeObjectURL(preview) : undefined), [preview]);

  const image = preview ?? defaultImageUrl ?? undefined;

  return (
    <div className="w-full">
      <span id={`${id}-label`} className="mb-1.5 block text-sm font-medium text-secondary">
        {label}
        {isRequired && (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        )}
      </span>
      <div
        {...getRootProps({
          "aria-labelledby": `${id}-label`,
          "aria-describedby": `${id}-hint`,
          "aria-invalid": errorMessage ? true : undefined,
        })}
        className={clsx(
          "flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 text-center transition-colors",
          isDragActive ? "border-primary-700 bg-primary-100" : "border-secondary/30 bg-white",
          errorMessage && "border-danger",
          isDisabled && "cursor-not-allowed opacity-60",
        )}
      >
        <input {...getInputProps()} />
        {image ? (
          <>
            <img
              src={image}
              alt="Vista previa de la imagen"
              className={clsx(
                "max-h-56 w-full rounded-lg",
                fit === "contain" ? "object-contain" : "object-cover",
              )}
            />
            <p className="text-xs text-muted">
              {value ? `${value.name} · ${formatSize(value.size)}. ` : "Imagen actual. "}
              Haz clic o arrastra otra para reemplazarla.
            </p>
          </>
        ) : (
          <>
            <MdOutlineCloudUpload aria-hidden="true" className="text-4xl text-primary-800" />
            <p className="text-sm font-medium text-secondary">
              {text ?? "Arrastra la imagen o haz clic para elegirla"}
            </p>
          </>
        )}
      </div>
      <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
        {IMAGE_HINT}
      </p>
      {errorMessage && (
        <p role="alert" className="mt-1 text-xs text-danger">
          {errorMessage}
        </p>
      )}
      {value && !isDisabled && (
        <button
          type="button"
          className="mt-1 text-xs font-medium text-primary-900 underline"
          onClick={() => onChange(null)}
        >
          Quitar imagen
        </button>
      )}
    </div>
  );
};
