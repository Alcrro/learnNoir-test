import { slugToText } from "../../../../libs/utils/slugToText";
import {
	buildLessonChips,
	deriveProgress,
	deriveStatus,
	getDefaultDescription,
	getDefaultDifficulty,
	getGroupMeta,
} from "../lib/catalogPresentation";
import { getFallbackProgrammingCatalog } from "../data/programmingCatalogFallback";
import type {
	ProgrammingCatalogItem,
	ProgrammingCatalogResponse,
	ProgrammingCategory,
} from "../types/catalog.types";

const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000/api";

type RawLesson = Record<string, unknown>;

function isProgrammingCategory(value: string): value is ProgrammingCategory {
	return value === "algorithms" || value === "data-structures";
}

function getLessonsFromPayload(payload: unknown): RawLesson[] {
	if (Array.isArray(payload)) {
		return payload.filter(
			(item): item is RawLesson => typeof item === "object" && item !== null,
		);
	}

	if (!payload || typeof payload !== "object") {
		return [];
	}

	const record = payload as Record<string, unknown>;
	const candidates = [
		record.data,
		record.items,
		record.lessons,
		record.data && typeof record.data === "object"
			? (record.data as Record<string, unknown>).items
			: null,
		record.data && typeof record.data === "object"
			? (record.data as Record<string, unknown>).lessons
			: null,
	];

	for (const candidate of candidates) {
		if (Array.isArray(candidate)) {
			return candidate.filter(
				(item): item is RawLesson => typeof item === "object" && item !== null,
			);
		}
	}

	return [];
}

function getStringValue(record: RawLesson, keys: string[]): string | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.trim()) {
			return value;
		}
	}

	return undefined;
}

function getNumberValue(record: RawLesson, keys: string[]): number | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
	}

	return undefined;
}

function normalizeLesson(
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

	const groupValue = getStringValue(lesson, ["group", "section", "categoryGroup"]);
	const groupMeta = getGroupMeta(category, rawId, groupValue);
	const difficulty =
		getStringValue(lesson, ["difficulty"]) as ProgrammingCatalogItem["difficulty"];
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
			rawPath ?? `/subjects/programming/${category}/${getStringValue(lesson, ["slug"]) ?? rawId}`,
		category,
		group: groupMeta.key,
		groupLabel:
			getStringValue(lesson, ["groupLabel", "sectionLabel"]) ?? groupMeta.label,
		groupOrder: getNumberValue(lesson, ["groupOrder"]) ?? groupMeta.order,
		sortOrder: getNumberValue(lesson, ["sortOrder", "order"]) ?? index,
		description:
			getStringValue(lesson, ["description", "summary", "excerpt"]) ??
			getDefaultDescription(category, name, groupMeta.label),
		difficulty:
			difficulty ?? getDefaultDifficulty(category, groupMeta.key),
		progress,
		status: deriveStatus(progress, getStringValue(lesson, ["status"])),
		chips,
		estimatedTime: getNumberValue(lesson, ["estimatedTime", "duration"]),
		isAvailable:
			typeof lesson.isAvailable === "boolean" ? lesson.isAvailable : true,
	};
}

export async function getProgrammingCatalog(
	category: ProgrammingCategory,
): Promise<ProgrammingCatalogResponse> {
	if (!isProgrammingCategory(category)) {
		throw new Error(`Unsupported programming category: ${category}`);
	}

	try {
		const response = await fetch(`${API_URI}/subjects/programming/${category}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch programming catalog: ${response.status}`);
		}

		const payload = await response.json();
		const lessons = getLessonsFromPayload(payload)
			.map((lesson, index) => normalizeLesson(lesson, category, index))
			.filter((lesson): lesson is ProgrammingCatalogItem => lesson !== null);

		if (!lessons.length) {
			return getFallbackProgrammingCatalog(category);
		}

		const payloadRecord =
			payload && typeof payload === "object"
				? (payload as Record<string, unknown>)
				: {};
		const nestedData =
			payloadRecord.data && typeof payloadRecord.data === "object"
				? (payloadRecord.data as Record<string, unknown>)
				: {};

		return {
			category,
			title:
				(typeof nestedData.title === "string" && nestedData.title) ||
				(typeof payloadRecord.title === "string" && payloadRecord.title) ||
				slugToText(category),
			description:
				(typeof nestedData.description === "string" && nestedData.description) ||
				(typeof payloadRecord.description === "string" &&
					payloadRecord.description) ||
				"",
			lessons,
		};
	} catch (error) {
		console.warn("Falling back to local programming catalog data", error);
		return getFallbackProgrammingCatalog(category);
	}
}
