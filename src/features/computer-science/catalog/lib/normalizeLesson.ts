import { RawLesson } from "../api/getProgrammingCatalog";
import {
	ProgrammingCatalogItem,
	ProgrammingCategory,
} from "../types/catalog.types";
import {
	buildLessonChips,
	deriveProgress,
	deriveStatus,
	getDefaultDescription,
	getDefaultDifficulty,
	getGroupMeta,
} from "./catalogPresentation";
import { getNumberValue } from "./getNumberValue";
import { getStringValue } from "./getStringValue";

export function normalizeLesson(
	lesson: RawLesson,
	category: ProgrammingCategory,
	index: number,
): ProgrammingCatalogItem | null {
	const rawPath = getStringValue(lesson, ["path", "href", "url"]);
	const rawId =
		getStringValue(lesson, ["id", "slug", "lessonId"]) ??
		rawPath?.split("/").filter(Boolean).pop();
	const name = getStringValue(lesson, ["name", "title"]);

	if (!rawId || !name) return null;

	const groupValue = getStringValue(lesson, [
		"group",
		"section",
		"categoryGroup",
	]);
	const groupMeta = getGroupMeta(category, rawId, groupValue);
	const difficulty = getStringValue(lesson, [
		"difficulty",
	]) as ProgrammingCatalogItem["difficulty"];
	const progress = deriveProgress(
		getNumberValue(lesson, ["progress"]),
		getStringValue(lesson, ["status"]),
	);

	const chips = buildLessonChips({
		timeComplexity: getStringValue(lesson, ["timeComplexity"]),
		spaceComplexity: getStringValue(lesson, ["spaceComplexity"]),
		stable:
			typeof lesson.stable === "boolean"
				? lesson.stable
				: lesson.stable === "true"
					? true
					: lesson.stable === "false"
						? false
						: null,
		chips: Array.isArray(lesson.chips)
			? (lesson.chips as Array<string | { id?: string; label?: string } | null>)
			: null,
	});

	return {
		id: rawId,
		name,
		path:
			rawPath ??
			`/subjects/programming/${category}/${getStringValue(lesson, ["slug"]) ?? rawId}`,
		category,
		group: groupMeta.key,
		groupLabel:
			getStringValue(lesson, ["groupLabel", "sectionLabel"]) ?? groupMeta.label,
		groupOrder: getNumberValue(lesson, ["groupOrder"]) ?? groupMeta.order,
		sortOrder: getNumberValue(lesson, ["sortOrder", "order"]) ?? index,
		description:
			getStringValue(lesson, ["description", "summary", "excerpt"]) ??
			getDefaultDescription(category, name, groupMeta.label),
		difficulty: difficulty ?? getDefaultDifficulty(category, groupMeta.key),
		progress,
		status: deriveStatus(progress, getStringValue(lesson, ["status"])),
		chips,
		estimatedTime: getNumberValue(lesson, ["estimatedTime", "duration"]),
		isAvailable:
			typeof lesson.isAvailable === "boolean" ? lesson.isAvailable : true,
	};
}
