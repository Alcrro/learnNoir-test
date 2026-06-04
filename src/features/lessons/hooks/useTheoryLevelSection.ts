import { useState, useEffect, useRef } from "react";
import { useIsPro } from "../../subscriptions/hooks/useIsPro";
import { useLessonContext } from "../context/LessonContext";
import { useTheoryLevelExplanations, useExplanationByLevel } from "./useTheoryLevelExplanations";
import { progressApi } from "../api/progressApi";
import type { ExplanationLevel } from "../api/theoryLevelApi";
import type { ExplanationStatus } from "@shared/theory-level-explanation";
import { getDefaultLevel, saveDefaultLevel } from "../lib/theoryLevelMeta";

export function useTheoryLevelSection(blockId: string) {
	const { lessonId, canEdit } = useLessonContext();
	const isPro = useIsPro();
	const [activeLevel, setActiveLevel] = useState<ExplanationLevel>(getDefaultLevel);
	const [fetchEnabled, setFetchEnabled] = useState(false);
	const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { explanations } = useTheoryLevelExplanations(lessonId, blockId);
	const { data: explanation, isLoading, isFetching } = useExplanationByLevel(
		lessonId,
		blockId,
		activeLevel,
		fetchEnabled,
	);

	useEffect(() => { setFetchEnabled(true); }, []);
	useEffect(() => { setFetchEnabled(true); }, [activeLevel]);

	function handleLevelChange(level: ExplanationLevel) {
		if (level === activeLevel) return;
		setActiveLevel(level);
		saveDefaultLevel(level);
		if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
		saveTimerRef.current = setTimeout(() => {
			void progressApi.upsert(lessonId, {} as Parameters<typeof progressApi.upsert>[1]).catch(() => null);
		}, 500);
	}

	function getStatus(level: ExplanationLevel): ExplanationStatus {
		const found = explanations.find((e) => e.level === level);
		if (!found) return "empty";
		return found.source;
	}

	return { lessonId, canEdit, isPro, activeLevel, explanation, isLoading, isFetching, handleLevelChange, getStatus };
}
