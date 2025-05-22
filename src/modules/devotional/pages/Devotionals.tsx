import { useEffect, useState } from "react";
import { FileUploadZone, formatDate, get, save } from "../../../common";
import { Devotional } from "../models";
import { Endpoints } from "../config/Endpoints";
import { useResponseModalStore } from "../../../hooks";
import { DevotionalCard } from "../components";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  useDisclosure,
} from "@heroui/react";
import { closeSnackbar, useSnackbar } from "notistack";

export const Devotionals = () => {
  const [file, setFile] = useState<File>();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [dependency, setDependency] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const showResp = useResponseModalStore((s) => s.showModal);
  const uploadFile = async () => {
    if (file == null) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const data = await save(Endpoints.DEVOTIONALS, formData);
    showResp(data);
    closeSnackbar();
    setDependency(!dependency);
  };
  const getDevotionals = async () => {
    const resp = await get<Devotional[]>(Endpoints.DEVOTIONALS);
    if (resp.error) {
      showResp(resp);
    } else {
      setDevotionals(resp.body ?? []);
    }
  };
  useEffect(() => {
    getDevotionals();
  }, [dependency]);

  return (
    <div className="overflow-scroll">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>
                <p>Desea subir ese archivo?</p>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-end">
                  <Button color="danger" onPress={() => close()}>
                    Cancelar
                  </Button>
                  <Spacer />
                  <Button
                    onPress={() => {
                      uploadFile();
                      close();
                      enqueueSnackbar("Subiendo imagen...", {
                        preventDuplicate: false,
                        persist: true,
                        variant: "loading",
                      });
                    }}
                    color="primary"
                  >
                    Subir
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <FileUploadZone
        onChangeFile={async (value) => {
          if (!value) return;
          setFile(value);
          onOpen();
        }}
        config={{ image: "*" }}
      />
      <div className="w-full sm:flex flex-wrap ">
        {devotionals.map((devotional) => (
          <DevotionalCard
            key={devotional.id}
            imageUrl={devotional.imageUrl}
            uploadDate={formatDate(devotional.createdDate)}
          />
        ))}
      </div>
    </div>
  );
};
