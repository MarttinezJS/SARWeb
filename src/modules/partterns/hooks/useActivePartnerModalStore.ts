import { create } from "zustand";
import { ModalStore } from "../../../models";
import { Partner } from "../models";

interface useActivePartnerModalStoreProps extends ModalStore {
  partner: Partner | undefined;
  showModal: (partner: Partner) => void;
}

export const useActivePartnerModalStore =
  create<useActivePartnerModalStoreProps>((set) => ({
    visible: false,
    partner: undefined,
    closeModal: () => set({ visible: false }),
    showModal: (partner) => set({ visible: true, partner }),
  }));
