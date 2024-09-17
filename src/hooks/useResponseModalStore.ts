import { create } from "zustand";
import type { Response } from "../models";

interface ResponseModalStore {
  visible: boolean;
  resp: Response<any> | null;
  closeModal: () => void;
  showModal: (resp: Response<any>) => void;
}

export const useResponseModalStore = create<ResponseModalStore>((set) => ({
  visible: false,
  resp: null,
  closeModal: () => set({ visible: false, resp: null }),
  showModal: (resp) => set({ visible: true, resp }),
}));
