import { useState, useEffect, useRef } from "react";
import { patchLessonProgress } from "../api/progressApi";
import { useGuestProgressStore } from "../../../../features/lessons/store/useGuestProgressStore";
import type { LessonTheoryModel } from "../lib/buildAlgorithmLessonTheory";
import type { ConfidenceLevel } from "../components/lesson/theory-v1/ConfidenceRating";

// readScore: steps=40 · confidence=30 · all-misc-revealed=30
export function useLessonReadProgress(
	trackingId: string | undefined,
	model: LessonTheoryModel | null,
	isAuthenticated = true,
) {
	const [stepsRevealed, setStepsRevealed] = useState(false);
	const [miscRevealed, setMiscRevealed] = useState(false);
	const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
	const lastSentScore = useRef(-1);
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);

	useEffect(() => {
		if (!trackingId || !model) return;
		const score =
			(stepsRevealed ? 40 : 0) + (confidence !== null ? 30 : 0) + (miscRevealed ? 30 : 0);
		if (score === lastSentScore.current) return;
		lastSentScore.current = score;
		const status = score === 100 ? "completed" : "in_progress";
		if (isAuthenticated) {
			patchLessonProgress(trackingId, { readScore: score, status });
		} else {
			setGuestReadProgress(trackingId, score, status);
		}
	}, [stepsRevealed, confidence, miscRevealed, trackingId, model, isAuthenticated, setGuestReadProgress]);

	return { stepsRevealed, setStepsRevealed, miscRevealed, setMiscRevealed, confidence, setConfidence };
}
