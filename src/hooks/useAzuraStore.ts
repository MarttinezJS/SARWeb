import { create } from "zustand";
import type { NowPlaying } from "../models";

interface AzuraStoreProps {
  data: NowPlaying | undefined;
  setData: (data: NowPlaying) => void;
}

export const useAzuraStore = create<AzuraStoreProps>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
