import { apiClient } from "../../../libs/apiClient";
import type { LessonTranslation } from "@shared/lesson-translation";

export const lessonTranslationApi = {
	translate: (lessonId: string, lang: string): Promise<LessonTranslation> =>
		apiClient
			.post<{ data: LessonTranslation }>(`/lessons/${lessonId}/translate`, { lang })
			.then((r) => r.data),
};
