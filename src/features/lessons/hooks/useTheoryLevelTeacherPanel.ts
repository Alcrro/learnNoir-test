import { useState, useEffect } from "react";
import type { ExplanationLevel, TheoryLevelExplanation } from "../api/theoryLevelApi";
import { useGenerateExplanationForTeacher, useUpsertTeacherExplanation } from "./useTheoryLevelExplanations";

type Params = {
	lessonId: string;
	blockId: string;
	activeLevel: ExplanationLevel;
	currentExplanation: TheoryLevelExplanation | null | undefined;
};

export function useTheoryLevelTeacherPanel({ lessonId, blockId, activeLevel, currentExplanation }: Params) {
	const [draft, setDraft] = useState(currentExplanation?.content ?? "");
	const upsert = useUpsertTeacherExplanation(lessonId, blockId);
	const generate = useGenerateExplanationForTeacher(lessonId, blockId);

	useEffect(() => {
		setDraft(currentExplanation?.content ?? "");
	}, [currentExplanation?.content, activeLevel]);

	function handleSave() {
		if (!draft.trim()) return;
		upsert.mutate({ level: activeLevel, content: draft });
	}

	function handleGenerate() {
		generate.mutate(activeLevel, {
			onSuccess: (data) => setDraft(data.content),
		});
	}

	return {
		draft,
		setDraft,
		handleSave,
		handleGenerate,
		isSaving: upsert.isPending,
		isGenerating: generate.isPending,
	};
}
