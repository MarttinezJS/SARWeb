import { create } from "zustand";
import { AzuraResp } from "../models";

interface AzuraStoreProps {
  data: AzuraResp | undefined;
  setData: (data: AzuraResp) => void;
}

export const useAzuraStore = create<AzuraStoreProps>((set) => ({
  data: undefined,
  setData: (data) => set({ data }),
}));
