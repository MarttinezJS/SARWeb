import { create } from "zustand";

interface useReloadTableProps {
  reload: () => void;
  dependency: boolean;
}

export const useReloadTable = create<useReloadTableProps>((set) => ({
  dependency: false,
  reload: () => set(({ dependency }) => ({ dependency: !dependency })),
}));
