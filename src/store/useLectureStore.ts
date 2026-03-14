import { create } from "zustand";

type LectureStore = {
  activeLecture: string | null;
  openLecture: (id: string) => void;
  closeLecture: () => void;
};
export const useLectureStore = create<LectureStore>((set) => ({
  activeLecture: null,
  openLecture(id) {
    set(() => ({ activeLecture: id }));
  },
  closeLecture() {
    set(() => ({ activeLecture: null }));
  },
}));
