import { useParams } from "react-router-dom";
import type { LessonDTO } from "../api/lessonsApi";
import { useLessonsByModuleQuery } from "./useLessonsByModuleQuery";
import { groupLessonsByTopic } from "./useLessonListPage";

type Result =
	| { hasVariants: false; variants: []; baseTitle: null }
	| { hasVariants: true; variants: LessonDTO[]; baseTitle: string };

export function useLessonLanguageVariants(lessonId: string): Result {
	const { module: moduleSlug = "" } = useParams<{ module: string }>();
	const { data: lessons = [] } = useLessonsByModuleQuery(moduleSlug);

	if (!lessons.some((l) => l.language)) {
		return { hasVariants: false, variants: [], baseTitle: null };
	}

	const groups = groupLessonsByTopic(lessons);
	const group = groups.find((g) => g.variants.some((v) => v.id === lessonId));

	if (!group || group.variants.length <= 1) {
		return { hasVariants: false, variants: [], baseTitle: null };
	}

	return { hasVariants: true, variants: group.variants, baseTitle: group.baseTitle };
}
