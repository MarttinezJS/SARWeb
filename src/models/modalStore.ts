export interface ModalStore {
  visible: boolean;
  closeModal: () => void;
  showModal: (...args: never[]) => void;
}
