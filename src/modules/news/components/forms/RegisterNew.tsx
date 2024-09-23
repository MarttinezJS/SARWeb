import { enqueueSnackbar, closeSnackbar } from "notistack";
import { useState } from "react";
import {
  save,
  CustomForm,
  InputForm,
  FileUploadZone,
  AreaForm,
} from "../../../../common";
import { useResponseModalStore } from "../../../../hooks";
import { Endpoints } from "../../config/endpoints";
import { NewsFields } from "../../models";

export const RegisterNew = () => {
  const [image, setImage] = useState<File>();
  const showResp = useResponseModalStore((s) => s.showModal);
  const onSubmit = async (formData: NewsFields) => {
    enqueueSnackbar("Guardando");
    const form = new FormData();
    form.append("title", formData.title);
    form.append("abstract", formData.abstract);
    form.append("text", formData.text);
    image && form.append("image", image);
    const resp = await save(Endpoints.NEWS, form);
    showResp(resp);
    if (resp.error == false) {
      setImage(undefined);
    }
    closeSnackbar();
    return resp;
  };
  return (
    <div className="p-3 flex justify-center">
      <div className="md:w-1/2">
        <CustomForm<NewsFields> onSubmit={onSubmit}>
          {(register) => (
            <div className="">
              <InputForm
                registerReturn={register("title", {
                  required: "Se necesita el titulo de la noticia",
                })}
                label="Titulo"
              />
              <InputForm
                registerReturn={register("abstract", {
                  required: "Se necesita el resumen de la noticia",
                })}
                label="Resumen"
              />
              <FileUploadZone
                onChangeFile={setImage}
                config={{ image: "*" }}
                text="Imagen de la noticia."
              />
              <AreaForm
                registerReturn={register("text", {
                  required: "Se necesita el desarrollo de la noticia",
                })}
                label="Texto"
              />
            </div>
          )}
        </CustomForm>
      </div>
    </div>
  );
};
