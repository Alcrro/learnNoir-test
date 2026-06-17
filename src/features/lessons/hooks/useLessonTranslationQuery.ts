import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LessonTranslation } from "@shared/lesson-translation";
import { lessonTranslationApi } from "../api/lessonTranslationApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";
import { useLessonTranslationStore } from "../store/useLessonTranslationStore";
import { ORIGINAL_LANG } from "../lib/translationLanguages";
import { useToastStore } from "../../../store/useToastStore";
import { useGetMe } from "../../auth/hooks/useAuth";

export function useLessonTranslationQuery(
	lessonId: string,
	lang: string,
): { data: LessonTranslation | undefined; isLoading: boolean } {
	const setLang = useLessonTranslationStore((s) => s.setLang);
	const showToast = useToastStore((s) => s.show);
	const { data: me } = useGetMe();

	const { data, isLoading, isError } = useQuery({
		queryKey: lessonQueryKeys.translation(lessonId, lang),
		queryFn: () => lessonTranslationApi.translate(lessonId, lang),
		enabled: !!lessonId && lang !== ORIGINAL_LANG && !!me?.userId,
		staleTime: 7 * 24 * 60 * 60 * 1000,
		retry: 1,
	});

	useEffect(() => {
		if (isError) {
			setLang(lessonId, ORIGINAL_LANG);
			showToast("Translation failed — reverting to original", "info");
		}
	}, [isError, lessonId, setLang, showToast]);

	return { data, isLoading };
}
