import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ORIGINAL_LANG } from "../lib/translationLanguages";

type LessonTranslationStore = {
	langByLesson: Record<string, string>;
	getLang: (lessonId: string) => string;
	setLang: (lessonId: string, lang: string) => void;
};

export const useLessonTranslationStore = create<LessonTranslationStore>()(
	persist(
		(set, get) => ({
			langByLesson: {},

			getLang: (lessonId) => get().langByLesson[lessonId] ?? ORIGINAL_LANG,

			setLang: (lessonId, lang) =>
				set((s) => ({
					langByLesson: { ...s.langByLesson, [lessonId]: lang },
				})),
		}),
		{
			name: "lesson-translation-lang",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
