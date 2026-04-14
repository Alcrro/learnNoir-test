import { create } from "zustand";

type ToggleProps = {
  toggle: Set<string>;
  isToggled: (value: string) => boolean;
  setToggle: (value: string) => void;
  openToggle: (value: string) => void;
  closeToggle: (value: string) => void;
};
export const useToggleStore = create<ToggleProps>((set, get) => ({
  toggle: new Set(),
  isToggled: (value) => get().toggle.has(value),
  setToggle: (value: string) =>
    set((state) => {
      const newSet = new Set(state.toggle);

      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return { toggle: newSet };
    }),
  openToggle: (value) => {
    set((state) => {
      const newSet = new Set(state.toggle);

      if (!newSet.has(value)) {
        newSet.add(value);
      }
      console.log(newSet);

      return { toggle: newSet };
    });
  },
  closeToggle: (value) => {
    set((state) => {
      const newSet = new Set(state.toggle);

      if (newSet.has(value)) {
        newSet.delete(value);
      }
      console.log({ state });

      return { toggle: newSet };
    });
  },
}));
