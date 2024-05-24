import { create } from "zustand";

type CoverStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCover = create<CoverStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
