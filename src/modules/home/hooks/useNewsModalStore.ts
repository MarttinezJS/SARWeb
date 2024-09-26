import { create } from "zustand";
import { ModalStore } from "../../../models";
import { New } from "../models";

interface useNewsModalStoreProps extends ModalStore {
  news: New | undefined;
  showModal: (news: New) => void;
}

export const useNewsModalStore = create<useNewsModalStoreProps>((set) => ({
  visible: false,
  news: undefined,
  closeModal: () => set({ visible: false, news: undefined }),
  showModal: (news) => set({ visible: true, news }),
}));
