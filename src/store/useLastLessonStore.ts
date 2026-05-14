import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type LessonSnapshot = {
	href: string;
	title: string;
};

type LastLessonStore = {
	snapshot: LessonSnapshot | null;
	save: (s: LessonSnapshot) => void;
};

export const useLastLessonStore = create<LastLessonStore>()(
	persist(
		(set) => ({
			snapshot: null,
			save: (snapshot) => set({ snapshot }),
		}),
		{
			name: "last-lesson",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
