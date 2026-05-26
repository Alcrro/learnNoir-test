import { apiClient } from "../../../libs/apiClient";
import type { TheoryInteractionComponentType, TheoryInteractionStatus, TheoryInteractionDTO, LessonContextForAI, RecordAttemptInput, TheoryAttemptDTO } from "../types/interaction.types";
export type { TheoryInteractionComponentType, TheoryInteractionStatus, TheoryInteractionDTO, LessonContextForAI, RecordAttemptInput, TheoryAttemptDTO };

export const lessonTheoryInteractionsApi = {
	/** Student: only approved interactions */
	getApproved: (lessonId: string) =>
		apiClient.get<{ data: TheoryInteractionDTO[] }>(`/lessons/${lessonId}/theory-interactions`)
			.then((r) => r.data),

	/** Student: all attempts for the current user on this lesson */
	getMyAttempts: (lessonId: string) =>
		apiClient.get<{ data: TheoryAttemptDTO[] }>(`/lessons/${lessonId}/theory-interactions/my-attempts`)
			.then((r) => r.data),

	/** Student: list of component types the user has engaged with (from engage flow) */
	getMyProgress: (lessonId: string) =>
		apiClient.get<{ data: TheoryInteractionComponentType[] }>(`/lessons/${lessonId}/theory-interactions/my-progress`)
			.then((r) => r.data),

	/** Student: record an attempt for a theory interaction */
	recordAttempt: (lessonId: string, interactionId: string, input: RecordAttemptInput) =>
		apiClient.post<{ data: TheoryAttemptDTO }>(
			`/lessons/${lessonId}/theory-interactions/${interactionId}/attempt`,
			input,
		).then((r) => r.data),

	/** Student: record engagement with a theory component by type.
	 *  Works regardless of whether an approved interaction exists — creates the activity lazily. */
	engage: (lessonId: string, componentType: TheoryInteractionComponentType) =>
		apiClient.post<{ data: { lessonProgress: unknown } }>(
			`/lessons/${lessonId}/theory-interactions/engage`,
			{ componentType },
		).then((r) => r.data),

	/** Teacher: all versions including drafts */
	getAll: (lessonId: string) =>
		apiClient.get<{ data: TheoryInteractionDTO[] }>(`/lessons/${lessonId}/theory-interactions/all`)
			.then((r) => r.data),

	/** Generate a component via AI — creates a draft */
	generate: (lessonId: string, component: TheoryInteractionComponentType, lessonContext: LessonContextForAI) =>
		apiClient.post<{ data: TheoryInteractionDTO }>(
			`/lessons/${lessonId}/theory-interactions/${component}/generate`,
			{ lessonContext },
		).then((r) => r.data),

	/** Approve a draft interaction */
	approve: (lessonId: string, interactionId: string) =>
		apiClient.patch<{ data: TheoryInteractionDTO }>(
			`/lessons/${lessonId}/theory-interactions/${interactionId}/approve`,
		).then((r) => r.data),

	/** Manual content update */
	update: (lessonId: string, interactionId: string, content: unknown) =>
		apiClient.patch<{ data: TheoryInteractionDTO }>(
			`/lessons/${lessonId}/theory-interactions/${interactionId}`,
			{ content },
		).then((r) => r.data),
};
