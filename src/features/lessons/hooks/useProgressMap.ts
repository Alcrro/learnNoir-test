import { useQueries } from "@tanstack/react-query";
import UseGetProfile from "../../profiles/hooks/UseGetProfile";
import { progressApi, type LessonProgress } from "../api/progressApi";
import {
	useGuestProgressStore,
	type LessonGuestProgress,
} from "../store/useGuestProgressStore";

// All possible theory interaction component types — used as denominator for guest quizScore.
const TOTAL_THEORY_COMPONENTS = 8;

function guestToProgress(lessonId: string, g: LessonGuestProgress): LessonProgress {
	// Mirror the server's quizScore: each engaged component is worth an equal share.
	const quizScore =
		g.engagedComponents.length > 0
			? Math.round((g.engagedComponents.length / TOTAL_THEORY_COMPONENTS) * 100)
			: 0;
	// Mirror the server's weightedScore: average of the three sub-scores.
	// outputScore is always 0 for guests (requires submission).
	const weightedScore = Math.round((g.readScore + quizScore + 0) / 3);

	return {
		id: "",
		userId: "",
		lessonId,
		status: g.status,
		weightedScore,
		quizScore,
		readScore: g.readScore,
		outputScore: 0,
		lastActivityAt: null,
		createdAt: null,
		updatedAt: null,
	};
}

/**
 * Returns a lessonId → LessonProgress map that works for both authenticated
 * users (fetches from the API) and guests (reads from the local guest store).
 * Drop this in anywhere a progress map is needed — it picks the right source
 * automatically and never fires unauthenticated API requests.
 */
export function useProgressMap(lessonIds: string[]): Record<string, LessonProgress | null> {
	const { isAuthenticated, isAuthLoading } = UseGetProfile();
	const guestLessons = useGuestProgressStore((s) => s.lessons);

	const progressQueries = useQueries({
		queries: lessonIds.map((lessonId) => ({
			queryKey: ["lesson-progress", lessonId],
			queryFn: () => progressApi.getByLesson(lessonId),
			staleTime: 60 * 1000,
			enabled: !isAuthLoading && isAuthenticated && !!lessonId,
		})),
	});

	const progressMap: Record<string, LessonProgress | null> = {};

	if (isAuthLoading) return progressMap;

	if (isAuthenticated) {
		lessonIds.forEach((lessonId, i) => {
			const result = progressQueries[i];
			if (result && !result.isLoading) {
				progressMap[lessonId] = result.data ?? null;
			}
		});
	} else {
		lessonIds.forEach((lessonId) => {
			const guest = guestLessons[lessonId];
			progressMap[lessonId] =
				guest && guest.status !== "not_started"
					? guestToProgress(lessonId, guest)
					: null;
		});
	}

	return progressMap;
}
