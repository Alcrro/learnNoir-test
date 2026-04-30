import { RawLesson } from "../api/getProgrammingCatalog";

export function getLessonsFromPayload(payload: unknown): RawLesson[] {
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
