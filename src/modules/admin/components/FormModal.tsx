import type { ReactNode } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "md" | "lg" | "2xl" | "3xl";
  children: ReactNode;
}

/** Modal con desplazamiento interno para los formularios de administración. */
export const FormModal = ({
  isOpen,
  onClose,
  title,
  description,
  size = "2xl",
  children,
}: FormModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size={size}
    placement="center"
    backdrop="blur"
    scrollBehavior="inside"
    isDismissable={false}
    classNames={{ closeButton: "text-secondary text-xl" }}
  >
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">
        <span className="title text-2xl text-secondary">{title}</span>
        {description && <span className="text-sm font-normal text-muted">{description}</span>}
      </ModalHeader>
      <ModalBody className="pb-6">{children}</ModalBody>
    </ModalContent>
  </Modal>
);
