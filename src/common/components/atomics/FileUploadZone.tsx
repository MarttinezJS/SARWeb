import { useDropzone } from "react-dropzone";
import {
  useResetFieldExternalStore,
  useResponseModalStore,
} from "../../../hooks";
import { Response } from "../../../models";
import { useEffect, useState } from "react";
import { Image } from "@heroui/react";
interface Config {
  audio?: string | "*";
  image?: string | "*";
  video?: string | "*";
  others?: string[];
}
interface FileUploadZoneProps {
  config?: Config;
  onChangeFile: (file: File) => void;
  text?: string;
  defaultImageUrl?: string;
}

export const FileUploadZone = ({
  onChangeFile,
  config,
  text,
  defaultImageUrl,
}: FileUploadZoneProps) => {
  const { showModal: showResponse } = useResponseModalStore();
  const addDependency = useResetFieldExternalStore((s) => s.addDependency);
  const [imageSelected, setImageSelected] = useState<File>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDropAccepted: (e) => {
      const file = e[0];
      setImageSelected(file);
      onChangeFile(file);
    },
    onDropRejected: (errors) => {
      const resp: Response<string[]> = {
        error: true,
        status: 0,
        message: "Error al Subir archivos",
        body: errors.map(
          (e) =>
            `${e.file.name}: ${e.errors
              .map((reason) => reason.message)
              .join("/")}`
        ),
      };

      showResponse(resp);
    },
  });
  useEffect(() => {
    onChangeFile(acceptedFiles[0]);
    addDependency(() => {
      setImageSelected(undefined);
    });
  }, [acceptedFiles]);

  return (
    <div
      {...getRootProps()}
      className="outline-dashed outline-gray-300 cursor-pointer rounded-lg text-center p-10 "
    >
      <input
        {...getInputProps({
          accept: config ? parseAcceptData(config) : undefined,
        })}
      />
      {!imageSelected && !defaultImageUrl ? (
        <p className="text-2xl text-gray-300">
          {text ?? "Arrastra la imagen o has click para subir."}
        </p>
      ) : (
        <Image
          src={
            imageSelected ? URL.createObjectURL(imageSelected) : defaultImageUrl
          }
        />
      )}
    </div>
  );
};

const parseAcceptData = (config: Config): string => {
  const mimeTypes = Object.keys(config).map((key) =>
    // @ts-ignore
    key != "others" ? `${key}/${config[key]}` : config.others?.join(", ")
  );
  return mimeTypes.join(", ");
};
