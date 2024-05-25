import { create } from "zustand";

type CoverStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
  url?: string;
};

export const useCover = create<CoverStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
  url: undefined,
}));
