import { slugToText } from "../../../../libs/utils/slugToText";

import { getFallbackProgrammingCatalog } from "../data/programmingCatalogFallback";
import { getLessonsFromPayload } from "../lib/getLessonFromPayload";
import { isProgrammingCategory } from "../lib/isProgramminCategory";
import { normalizeLesson } from "../lib/normalizeLesson";
import type {
	ProgrammingCatalogItem,
	ProgrammingCatalogResponse,
	ProgrammingCategory,
} from "../types/catalog.types";

const API_URI = import.meta.env.VITE_API_URI || "http://localhost:3000/api";

export type RawLesson = Record<string, unknown>;

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
