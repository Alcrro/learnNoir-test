import { useReducer, useCallback } from "react";
import { weightedScore } from "../lib/quizScoring";
import type { MockQuiz, QuizQuestion } from "../lib/quizTypes";

export type QuizPhase = "start" | "question" | "summary";

export type QuestionResult = {
	selected: number | null;
	inputValue: string;
	isCorrect: boolean | null;
	locked: boolean;
};

type State = {
	phase: QuizPhase;
	currentIndex: number;
	results: Record<string, QuestionResult>;
};

type Action =
	| { type: "START" }
	| { type: "ANSWER_MCQ"; questionId: string; optionIndex: number; isCorrect: boolean }
	| { type: "SET_INPUT"; questionId: string; value: string }
	| { type: "SUBMIT_INPUT"; questionId: string; isCorrect: boolean }
	| { type: "NEXT"; lastIndex: number }
	| { type: "PREV" }
	| { type: "COMPLETE" }
	| { type: "RESTART" };

const emptyResult = (): QuestionResult => ({
	selected: null,
	inputValue: "",
	isCorrect: null,
	locked: false,
});

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "START":
			return { ...state, phase: "question", currentIndex: 0 };

		case "ANSWER_MCQ": {
			const existing = state.results[action.questionId] ?? emptyResult();
			if (existing.locked) return state;
			return {
				...state,
				results: {
					...state.results,
					[action.questionId]: {
						...existing,
						selected: action.optionIndex,
						isCorrect: action.isCorrect,
						locked: true,
					},
				},
			};
		}

		case "SET_INPUT": {
			const existing = state.results[action.questionId] ?? emptyResult();
			if (existing.locked) return state;
			return {
				...state,
				results: {
					...state.results,
					[action.questionId]: { ...existing, inputValue: action.value },
				},
			};
		}

		case "SUBMIT_INPUT": {
			const existing = state.results[action.questionId] ?? emptyResult();
			if (existing.locked) return state;
			return {
				...state,
				results: {
					...state.results,
					[action.questionId]: { ...existing, isCorrect: action.isCorrect, locked: true },
				},
			};
		}

		case "NEXT":
			if (state.currentIndex < action.lastIndex) {
				return { ...state, currentIndex: state.currentIndex + 1 };
			}
			return { ...state, phase: "summary" };

		case "PREV":
			return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) };

		case "COMPLETE":
			return { ...state, phase: "summary" };

		case "RESTART":
			return { phase: "start", currentIndex: 0, results: {} };

		default:
			return state;
	}
}

export function useQuizSession(quiz: MockQuiz) {
	const { questions } = quiz;

	const [state, dispatch] = useReducer(reducer, {
		phase: "start",
		currentIndex: 0,
		results: {},
	});

	const getResult = (id: string): QuestionResult => state.results[id] ?? emptyResult();

	const start = useCallback(() => dispatch({ type: "START" }), []);

	const answerMcq = useCallback(
		(questionId: string, optionIndex: number) => {
			const q = questions.find((x) => x.id === questionId);
			if (!q || q.type !== "mcq") return;
			dispatch({
				type: "ANSWER_MCQ",
				questionId,
				optionIndex,
				isCorrect: optionIndex === q.correctIndex,
			});
		},
		[questions],
	);

	const setInputValue = useCallback(
		(questionId: string, value: string) => dispatch({ type: "SET_INPUT", questionId, value }),
		[],
	);

	const submitInput = useCallback(
		(questionId: string, value: string) => {
			const q = questions.find((x) => x.id === questionId);
			if (!q || q.type !== "input") return;
			const isCorrect =
				value.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
			dispatch({ type: "SUBMIT_INPUT", questionId, isCorrect });
		},
		[questions],
	);

	const goNext = useCallback(
		() => dispatch({ type: "NEXT", lastIndex: questions.length - 1 }),
		[questions.length],
	);

	const goPrev = useCallback(() => dispatch({ type: "PREV" }), []);
	const complete = useCallback(() => dispatch({ type: "COMPLETE" }), []);
	const restart = useCallback(() => dispatch({ type: "RESTART" }), []);

	const score = weightedScore(questions, state.results);
	const answeredCount = Object.values(state.results).filter((r) => r.locked).length;
	const currentQuestion = questions[state.currentIndex] as QuizQuestion;

	return {
		phase: state.phase,
		currentIndex: state.currentIndex,
		currentQuestion,
		results: state.results,
		getResult,
		score,
		answeredCount,
		totalQuestions: questions.length,
		start,
		answerMcq,
		setInputValue,
		submitInput,
		goNext,
		goPrev,
		complete,
		restart,
	};
}
