import { create } from "zustand";
import type { LessonDTO } from "../api/lessonsApi";
import type { LessonBlock } from "../api/lessonBlocksApi";
import type { LessonProgress } from "../api/progressApi";

type LessonDataStore = {
	lesson: LessonDTO | null;
	blocks: LessonBlock[];
	progress: LessonProgress | null | undefined;
	canEdit: boolean;
	_patch: (data: Partial<LessonDataStore>) => void;
	reset: () => void;
};

const initialState = {
	lesson: null,
	blocks: [],
	progress: undefined,
	canEdit: false,
} satisfies Partial<LessonDataStore>;

export const useLessonDataStore = create<LessonDataStore>((set) => ({
	...initialState,
	_patch: (data) => set(data),
	reset: () => set({ ...initialState }),
}));
