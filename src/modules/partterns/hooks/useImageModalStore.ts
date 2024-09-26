import { create } from "zustand";
import { Partner } from "../models";
import { ModalStore } from "../../../models/modalStore";

interface ImageModalStore extends ModalStore {
  partner: Partner | undefined;
  showModal: (partner: Partner) => void;
}
export const useImageModalStore = create<ImageModalStore>((set) => ({
  visible: false,
  partner: undefined,
  closeModal: () => set({ visible: false, partner: undefined }),
  showModal: (partner) => set({ visible: true, partner }),
}));
