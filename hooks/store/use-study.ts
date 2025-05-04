import { create } from "zustand";

interface StudyStore {
    isStudyMode: boolean;
    toggleStudyMode: () => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
    isStudyMode: false,
    toggleStudyMode: () => set((state) => ({ isStudyMode: !state.isStudyMode })),
}));
