import { create } from "zustand";

interface ReloadMenuStore {
  dependency: boolean;
  reload: () => void;
}

export const useReloadMenuStore = create<ReloadMenuStore>((set) => ({
  dependency: false,
  reload: () => set(({ dependency }) => ({ dependency: !dependency })),
}));
