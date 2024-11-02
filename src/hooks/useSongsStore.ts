import { create } from "zustand";
import { MetaSong } from "../models";

interface SongsStoreProps {
  setData: (data: {
    next: MetaSong;
    playing: MetaSong;
    isLive: boolean;
  }) => void;
  next: MetaSong | undefined;
  playing: MetaSong | undefined;
  isLive: boolean;
}

export const useSongsStore = create<SongsStoreProps>((set) => ({
  next: undefined,
  playing: undefined,
  isLive: false,
  setData: ({ playing, next, isLive }) => set({ playing, next, isLive }),
}));
