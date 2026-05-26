import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exercisesApi } from "../lib/exercisesApi";
import type { CodeRunResult } from "../lib/exerciseTypes";
import { lessonQueryKeys } from "../../../../lib/lessonQueryKeys";

type RunState =
	| { phase: "idle" }
	| { phase: "running" }
	| { phase: "results"; result: CodeRunResult; submitted: boolean };

export function useExerciseSession(exerciseId: string, lessonId: string, starterCode: string) {
	const qc = useQueryClient();
	const [code, setCode] = useState(starterCode);
	const [revealedHints, setRevealedHints] = useState<number[]>([]);
	const [runState, setRunState] = useState<RunState>({ phase: "idle" });

	const revealHint = useCallback((index: number) => {
		setRevealedHints((prev) => (prev.includes(index) ? prev : [...prev, index]));
	}, []);

	const { mutate: runCode, isPending: isRunning } = useMutation({
		mutationFn: () => exercisesApi.runCode(exerciseId, code),
		onMutate: () => setRunState({ phase: "running" }),
		onSuccess: (result) => setRunState({ phase: "results", result, submitted: false }),
		onError: () => setRunState({ phase: "idle" }),
	});

	const { mutate: submitCode, isPending: isSubmitting } = useMutation({
		mutationFn: () => exercisesApi.submit(exerciseId, code, revealedHints.length),
		onMutate: () => setRunState({ phase: "running" }),
		onSuccess: (data) => {
			const runResult = (data as { attempt: { passedTests: number; totalTests: number } }).attempt;
			setRunState({
				phase: "results",
				result: {
					passedCount: runResult.passedTests,
					totalCount: runResult.totalTests,
					results: [],
					totalTimeMs: 0,
				},
				submitted: true,
			});
			void qc.invalidateQueries({ queryKey: lessonQueryKeys.exerciseProgress(lessonId) });
		},
		onError: () => setRunState({ phase: "idle" }),
	});

	const reset = useCallback(() => {
		setCode(starterCode);
		setRevealedHints([]);
		setRunState({ phase: "idle" });
	}, [starterCode]);

	return {
		code,
		setCode,
		revealedHints,
		revealHint,
		runState,
		isRunning: isRunning || isSubmitting,
		run: runCode,
		submit: submitCode,
		reset,
	};
}
