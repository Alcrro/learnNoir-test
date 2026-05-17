import { progressApi } from "../api/progressApi";
import { lessonTheoryInteractionsApi } from "../api/lessonTheoryInteractionsApi";
import { useGuestProgressStore } from "../store/useGuestProgressStore";

/**
 * Flushes guest progress from localStorage to the API after login.
 * For each lesson, fetches the existing server progress first and only
 * writes fields where the guest made progress that isn't already recorded
 * (e.g. never downgrades a completed quiz score).
 */
export async function syncGuestProgressToServer(): Promise<void> {
	const store = useGuestProgressStore.getState();
	const allProgress = store.getAll();

	if (Object.keys(allProgress).length === 0) return;

	await Promise.allSettled(
		Object.entries(allProgress).map(async ([lessonId, guestProgress]) => {
			// Fetch what the user already has on the server (null if never started)
			const existing = await progressApi.getByLesson(lessonId).catch(() => null);

			const calls: Promise<unknown>[] = [];

			// Only sync readScore if the guest has more progress than what's on the server
			const serverReadScore = existing?.readScore ?? 0;
			if (guestProgress.readScore > serverReadScore) {
				const serverStatus = existing?.status ?? "not_started";
				// Don't downgrade a completed lesson
				const status =
					serverStatus === "completed" ? "completed" : guestProgress.status;
				calls.push(progressApi.upsert(lessonId, { readScore: guestProgress.readScore, status }));
			}

			// Skip theory interaction engage calls if the user already has a quizScore —
			// the backend recalculates quizScore from engage events, so sending partial
			// guest interactions could downgrade an existing completed theory quiz score.
			const serverQuizScore = existing?.quizScore ?? 0;
			if (serverQuizScore === 0 && guestProgress.engagedComponents.length > 0) {
				for (const component of guestProgress.engagedComponents) {
					calls.push(lessonTheoryInteractionsApi.engage(lessonId, component));
				}
			}

			await Promise.allSettled(calls);
		}),
	);

	store.clear();
}
