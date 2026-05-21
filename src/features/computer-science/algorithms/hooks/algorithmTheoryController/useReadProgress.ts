import { useState, useEffect, useRef } from "react";
import { patchLessonProgress } from "../../api/progressApi";
import { useGuestProgressStore } from "../../../../../features/lessons/store/useGuestProgressStore";
import UseGetProfile from "../../../../../features/profiles/hooks/UseGetProfile";
import { computeReadScore } from "./lib";

export function useAlgorithmReadProgress(dbLessonId: string, isEditing: boolean) {
	const { isAuthenticated } = UseGetProfile();
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);
	const [stepsRevealed, setStepsRevealed] = useState(false);
	const [miscRevealed, setMiscRevealed] = useState(false);
	const lastSentReadScore = useRef(-1);

	useEffect(() => {
		if (isEditing || !dbLessonId) return;
		const readScore = computeReadScore(stepsRevealed, miscRevealed);
		if (readScore === lastSentReadScore.current) return;
		lastSentReadScore.current = readScore;
		const status = readScore === 100 ? "completed" : "in_progress";
		if (isAuthenticated) {
			void patchLessonProgress(dbLessonId, { readScore, status });
		} else {
			setGuestReadProgress(dbLessonId, readScore, status);
		}
	}, [stepsRevealed, miscRevealed, dbLessonId, isEditing, isAuthenticated, setGuestReadProgress]);

	return {
		onStepsReveal: () => setStepsRevealed(true),
		onMiscReveal: () => setMiscRevealed(true),
	};
}
