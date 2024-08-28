import { useDropzone } from "react-dropzone";
import { useResponseModalStore } from "../../../hooks";
import { Response } from "../../../models";
import { useEffect } from "react";
interface Config {
  audio?: string | "*";
  image?: string | "*";
  video?: string | "*";
  others?: string[];
}
interface FileUploadZoneProps {
  config?: Config;
  onChangeFile: (file: File) => void;
}

export const FileUploadZone = ({
  onChangeFile,
  config,
}: FileUploadZoneProps) => {
  const { showModal: showResponse } = useResponseModalStore();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDropAccepted: (e) => onChangeFile(e[0]),
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
      <p className="text-2xl text-gray-300">
        Arrastra la imagen o has click para subir.
      </p>
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
