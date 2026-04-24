import { create } from "zustand";
import { Live, MetaSong } from "../models";

interface AzuraStoreProps {
  data: { live: Live; now_playing: MetaSong } | undefined;
  setData: (data: { live: Live; now_playing: MetaSong }) => void;
}

export const useAzuraStore = create<AzuraStoreProps>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
