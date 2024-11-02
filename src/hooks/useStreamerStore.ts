import { create } from "zustand";
import { Live } from "../models";

interface StreamerStoreProps {
  setData: (data: Live) => void;
  data: Live | undefined;
}

export const useStreamerStore = create<StreamerStoreProps>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
