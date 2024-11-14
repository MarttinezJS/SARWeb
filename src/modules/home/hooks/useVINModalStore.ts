import { create } from "zustand";
import { ModalStore } from "../../../models";

interface useVINModalStoreProps extends ModalStore {}

export const useVINModalStore = create<useVINModalStoreProps>((set) => ({
  visible: false,
  closeModal: () => set({ visible: false }),
  showModal: () => set({ visible: true }),
}));
