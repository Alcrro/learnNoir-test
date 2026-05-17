import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TheoryInteractionComponentType } from "../api/lessonTheoryInteractionsApi";

export type LessonGuestProgress = {
	engagedComponents: TheoryInteractionComponentType[];
	readScore: number;
	status: "not_started" | "in_progress" | "completed";
};

type GuestProgressStore = {
	lessons: Record<string, LessonGuestProgress>;
	engage: (lessonId: string, component: TheoryInteractionComponentType) => void;
	setReadProgress: (lessonId: string, readScore: number, status: LessonGuestProgress["status"]) => void;
	getLesson: (lessonId: string) => LessonGuestProgress;
	getAll: () => Record<string, LessonGuestProgress>;
	clear: () => void;
};

const EMPTY: LessonGuestProgress = { engagedComponents: [], readScore: 0, status: "not_started" };

export const useGuestProgressStore = create<GuestProgressStore>()(
	persist(
		(set, get) => ({
			lessons: {},
			engage: (lessonId, component) =>
				set((s) => {
					const lesson = s.lessons[lessonId] ?? { ...EMPTY };
					if (lesson.engagedComponents.includes(component)) return s;
					return {
						lessons: {
							...s.lessons,
							[lessonId]: {
								...lesson,
								engagedComponents: [...lesson.engagedComponents, component],
								status: "in_progress",
							},
						},
					};
				}),
			setReadProgress: (lessonId, readScore, status) =>
				set((s) => ({
					lessons: {
						...s.lessons,
						[lessonId]: { ...(s.lessons[lessonId] ?? { ...EMPTY }), readScore, status },
					},
				})),
			getLesson: (lessonId) => get().lessons[lessonId] ?? { ...EMPTY },
			getAll: () => get().lessons,
			clear: () => set({ lessons: {} }),
		}),
		{ name: "learnnoir-guest-progress" },
	),
);
