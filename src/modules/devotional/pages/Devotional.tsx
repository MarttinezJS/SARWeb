import { useState } from "react";
import { FileUploadZone } from "../../../common";

export const Devotional = () => {
  const [file, setFile] = useState<File>();
  return (
    <div>
      <FileUploadZone setFile={setFile} config={{ image: "*" }} />
    </div>
  );
};
