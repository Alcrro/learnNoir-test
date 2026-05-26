import { useState } from "react";
import { useUpsertProgressMutation } from "./useLessonProgressQuery";
import type { BlankDef } from "../components/molecules/fill-blanks/lib/types";

type Options = {
	lessonId: string;
	blanks: BlankDef[];
};

export function useFillBlanks({ lessonId, blanks }: Options) {
	const { mutate: upsertProgress } = useUpsertProgressMutation(lessonId);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [openId, setOpenId] = useState<number | null>(null);

	function handleSelect(id: number, val: string) {
		setAnswers((prev) => ({ ...prev, [id]: val }));
		setOpenId(null);
		upsertProgress({ status: "in_progress" });
	}

	const allAnswered = blanks.every((b) => answers[b.id] !== undefined);
	const allCorrect = allAnswered && blanks.every((b) => answers[b.id] === b.correct);
	const wrongCount = blanks.filter(
		(b) => answers[b.id] !== undefined && answers[b.id] !== b.correct,
	).length;

	return { answers, openId, setOpenId, handleSelect, allAnswered, allCorrect, wrongCount };
}
