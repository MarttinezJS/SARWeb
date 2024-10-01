import { create } from "zustand";

interface useResetFieldExternalStoreProps {
  reset: () => void;
  dependencies: Function[];
  addDependency: (dependency: Function) => void;
}

export const useResetFieldExternalStore =
  create<useResetFieldExternalStoreProps>((set) => ({
    dependencies: [],
    addDependency: (dependency) =>
      set(({ dependencies }) => ({
        dependencies: [...dependencies, dependency],
      })),
    reset: () =>
      set((data) => {
        for (const dependency of data.dependencies) {
          dependency();
        }
        return data;
      }),
  }));
