import { useState } from "react";
import { lessonAIApi } from "../api/lessonAIApi";
import type { LessonReviewResult, QuizQuestion } from "../api/lessonAIApi";

type AIState<T> = { data: T | null; loading: boolean; error: string | null };

function idle<T>(): AIState<T> {
	return { data: null, loading: false, error: null };
}

export function useLessonAI() {
	const [improve, setImprove] = useState<Record<string, AIState<string>>>({});
	const [review, setReview] = useState<AIState<LessonReviewResult>>(idle());
	const [quiz, setQuiz] = useState<AIState<QuizQuestion[]>>(idle());

	const improveField = async (fieldKey: string, text: string, context?: string) => {
		setImprove((prev) => ({ ...prev, [fieldKey]: { data: null, loading: true, error: null } }));
		try {
			const result = await lessonAIApi.improve(text, context);
			setImprove((prev) => ({ ...prev, [fieldKey]: { data: result, loading: false, error: null } }));
			return result;
		} catch {
			setImprove((prev) => ({
				...prev,
				[fieldKey]: { data: null, loading: false, error: "AI request failed" },
			}));
			return null;
		}
	};

	const reviewLesson = async (lesson: { title: string; description: string; content: string }) => {
		setReview({ data: null, loading: true, error: null });
		try {
			const result = await lessonAIApi.review(lesson);
			setReview({ data: result, loading: false, error: null });
		} catch {
			setReview({ data: null, loading: false, error: "AI review failed" });
		}
	};

	const generateQuiz = async (content: string, count = 3) => {
		setQuiz({ data: null, loading: true, error: null });
		try {
			const result = await lessonAIApi.generateQuiz(content, count);
			setQuiz({ data: result, loading: false, error: null });
		} catch {
			setQuiz({ data: null, loading: false, error: "AI quiz generation failed" });
		}
	};

	const clearReview = () => setReview(idle());
	const clearQuiz = () => setQuiz(idle());

	return {
		improveField,
		improveState: improve,
		reviewLesson,
		reviewState: review,
		generateQuiz,
		quizState: quiz,
		clearReview,
		clearQuiz,
	};
}
