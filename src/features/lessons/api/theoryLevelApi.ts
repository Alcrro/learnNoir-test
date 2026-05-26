import { apiClient } from "../../../libs/apiClient";
import { API_URL } from "../../../libs/config";
import type {
	TheoryLevelExplanation,
	ExplanationLevel,
} from "../../../../../shared/src/theory-level-explanation";

export type { TheoryLevelExplanation, ExplanationLevel };

const base = (lessonId: string, blockId: string) =>
	`/lessons/${lessonId}/blocks/${blockId}/explanations`;

export const theoryLevelApi = {
	getAll: (lessonId: string, blockId: string): Promise<TheoryLevelExplanation[]> =>
		apiClient
			.get<{ data: TheoryLevelExplanation[] }>(base(lessonId, blockId))
			.then((r) => r.data),

	getByLevel: async (
		lessonId: string,
		blockId: string,
		level: ExplanationLevel,
	): Promise<TheoryLevelExplanation | null> => {
		const res = await fetch(
			`${API_URL}${base(lessonId, blockId)}/${level}`,
			{ credentials: "include" },
		);
		if (res.status === 204) return null;
		if (!res.ok) {
			const body = await res.json().catch(() => null) as { error?: string } | null;
			throw new Error(body?.error ?? `HTTP ${res.status}`);
		}
		const json = await res.json() as { data: TheoryLevelExplanation };
		return json.data;
	},

	upsertTeacher: (
		lessonId: string,
		blockId: string,
		level: ExplanationLevel,
		content: string,
	): Promise<TheoryLevelExplanation> =>
		apiClient
			.put<{ data: TheoryLevelExplanation }>(`${base(lessonId, blockId)}/${level}`, { content })
			.then((r) => r.data),

	generate: (
		lessonId: string,
		blockId: string,
		level: ExplanationLevel,
	): Promise<TheoryLevelExplanation> =>
		apiClient
			.post<{ data: TheoryLevelExplanation }>(`${base(lessonId, blockId)}/${level}/generate`, {})
			.then((r) => r.data),
};
