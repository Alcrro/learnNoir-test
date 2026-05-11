import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { algorithms } from "../data/algorithmsData";
import { getFallbackProgrammingCatalog } from "../../catalog/data/programmingCatalogFallback";
import { buildAlgorithmLessonTheoryModel } from "../lib/buildAlgorithmLessonTheory";

export function useLessonTheoryModel() {
	const { category, lessonId, lessonSlug } = useParams<{
		category: string;
		lessonId: string;
		lessonSlug: string;
	}>();

	const model = useMemo(() => {
		const cat =
			category === "algorithms" || category === "data-structures" ? category : "algorithms";
		const catalog = getFallbackProgrammingCatalog(cat);

		const effectiveLessonId =
			lessonId ??
			catalog.lessons.find((l) => (lessonSlug ?? "").startsWith(l.id))?.id;

		if (!effectiveLessonId) return null;

		const lesson = catalog.lessons.find((l) => l.id === effectiveLessonId);
		if (!lesson) return null;

		const algorithmDetail =
			category === "algorithms"
				? algorithms.find((a) => a.id === effectiveLessonId)
				: undefined;

		const groupLessons = catalog.lessons
			.filter((l) => l.group === lesson.group)
			.sort((a, b) => a.sortOrder - b.sortOrder);

		return buildAlgorithmLessonTheoryModel({
			lesson,
			algorithmDetail: algorithmDetail
				? {
						id: algorithmDetail.id,
						group: algorithmDetail.group,
						prerequisites: algorithmDetail.prerequisites,
						estimatedTime: algorithmDetail.estimatedTime,
					}
				: { id: lesson.id },
			relatedLessons: groupLessons.filter((l) => l.id !== lesson.id),
			allLessonsInGroup: groupLessons,
		});
	}, [category, lessonId, lessonSlug]);

	const trackingId = lessonId ?? model?.title.toLowerCase().replace(/\s+/g, "-");

	return { model, trackingId, lessonId, lessonSlug };
}
