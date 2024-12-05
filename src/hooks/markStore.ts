// markStore.ts
import { create } from 'zustand';

type MarkdownStore = {
  content: string;
  setContent: (content: string) => void;
};

export const useMarkdownStore = create<MarkdownStore>((set) => ({
  content: '',
  setContent: (content: string) => set({ content }),
}));
