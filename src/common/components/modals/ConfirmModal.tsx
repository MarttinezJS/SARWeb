import { useState, type ReactNode } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  /** Acción a confirmar; el modal muestra carga hasta que termine. */
  onConfirm: () => Promise<void>;
  color?: "danger" | "secondary" | "success";
}

/** Diálogo de confirmación para acciones que no se pueden deshacer fácilmente. */
export const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel,
  onConfirm,
  color = "danger",
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop="blur"
      isDismissable={!isLoading}
      role="alertdialog"
    >
      <ModalContent>
        <ModalHeader className="title text-xl text-secondary">{title}</ModalHeader>
        <ModalBody className="text-sm text-secondary">{children}</ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onPress={onClose} isDisabled={isLoading}>
            Volver
          </Button>
          <Button
            color={color}
            isLoading={isLoading}
            onPress={async () => {
              setIsLoading(true);
              try {
                await onConfirm();
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
