import { useEffect, useState } from "react";
import { useModules } from "./useModules";
import { lessonsApi } from "../api/lessonsApi";
import { slugify } from "../lib/slugify";
import type { CreateLessonPayload, TeacherLessonDTO, UpdateLessonPayload } from "../types/teacher.types";

export function useLessonForm(
	lesson: TeacherLessonDTO | undefined,
	onSave: (payload: CreateLessonPayload | UpdateLessonPayload) => void,
) {
	const { data: modules } = useModules();

	const [title, setTitle] = useState(lesson?.title ?? "");
	const [description, setDescription] = useState(lesson?.description ?? "");
	const [moduleId, setModuleId] = useState(lesson?.moduleId ?? "");
	const [durationMins, setDurationMins] = useState(
		lesson ? String(Math.round(lesson.durationSeconds / 60)) : "",
	);
	const [isActive, setIsActive] = useState(lesson?.isActive ?? true);
	const [aiLoading, setAiLoading] = useState(false);
	const [aiError, setAiError] = useState<string | null>(null);

	const canSuggest = title.trim().length >= 8;
	const selectedModule = (modules ?? []).find((m) => m.id === moduleId);

	async function handleAISuggest() {
		if (!canSuggest) return;
		setAiLoading(true);
		setAiError(null);
		try {
			const moduleName = selectedModule?.name ?? "General";
			const suggestion = await lessonsApi.suggestMetadata(title, moduleName);
			setDescription(suggestion.description);
			setDurationMins(String(suggestion.durationMinutes));
		} catch {
			setAiError("AI suggestion failed. Please try again.");
		} finally {
			setAiLoading(false);
		}
	}

	// Auto-suggest when title reaches threshold for new lessons (fires once)
	useEffect(() => {
		if (lesson || !canSuggest || description || durationMins) return;
		handleAISuggest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canSuggest]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload: CreateLessonPayload = {
			title,
			slug: slugify(title),
			moduleId,
			description: description.trim() || null,
			durationSeconds: durationMins ? Number(durationMins) * 60 : 0,
			isActive,
		};
		onSave(payload);
	}

	return {
		modules,
		title,
		setTitle,
		description,
		setDescription,
		moduleId,
		setModuleId,
		durationMins,
		setDurationMins,
		isActive,
		setIsActive,
		aiLoading,
		aiError,
		canSuggest,
		handleAISuggest,
		handleSubmit,
	};
}
