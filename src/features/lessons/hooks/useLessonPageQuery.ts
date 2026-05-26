import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { LessonTabId } from "../types/ui.types";
export type { LessonTabId };

export const ALL_LESSON_TABS: { id: number; uniqueId: LessonTabId; label: string }[] = [
	{ id: 0, uniqueId: "theoryTab", label: "Theory" },
	{ id: 1, uniqueId: "vizTab", label: "Visualizer" },
	{ id: 2, uniqueId: "codeTab", label: "Code" },
	{ id: 3, uniqueId: "quizTab", label: "Quiz" },
	{ id: 4, uniqueId: "watchTab", label: "Watch" },
	{ id: 5, uniqueId: "exerciseTab", label: "Exercises" },
];

// Syncs the active tab with the URL ?tab= param.
// When leaving vizTab, removes the ?step= param that the visualiser uses.
export function useLessonPageQuery() {
	const [searchParams, setSearchParams] = useSearchParams();

	const tab = (searchParams.get("tab") as LessonTabId) ?? "theoryTab";

	useEffect(() => {
		const step = searchParams.get("step");
		if (tab !== "vizTab" && step) {
			const params = new URLSearchParams(searchParams);
			params.delete("step");
			setSearchParams(params, { replace: true });
		}
	}, [tab, searchParams, setSearchParams]);

	const setTab = (tabId: LessonTabId) => {
		const params = new URLSearchParams(searchParams);
		params.set("tab", tabId);
		if (tabId === "vizTab") {
			if (!params.get("step")) params.set("step", "1");
		} else {
			params.delete("step");
		}
		setSearchParams(params);
	};

	return { tab, setTab };
}
