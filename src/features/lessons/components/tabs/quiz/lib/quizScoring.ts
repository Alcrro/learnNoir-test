import { DIFFICULTY_WEIGHT } from "./quizTypes";
import type { QuizQuestion, Difficulty } from "./quizTypes";

type ResultMap = Record<string, { isCorrect: boolean | null }>;

export function maxPoints(questions: QuizQuestion[]): number {
	return questions.reduce((sum, q) => sum + DIFFICULTY_WEIGHT[q.difficulty], 0);
}

export function earnedPoints(questions: QuizQuestion[], results: ResultMap): number {
	return questions.reduce(
		(sum, q) => (results[q.id]?.isCorrect ? sum + DIFFICULTY_WEIGHT[q.difficulty] : sum),
		0,
	);
}

export function weightedScore(questions: QuizQuestion[], results: ResultMap): number {
	const max = maxPoints(questions);
	if (max === 0) return 0;
	return Math.round((earnedPoints(questions, results) / max) * 100);
}

export function countByDifficulty(questions: QuizQuestion[]): Record<Difficulty, number> {
	const acc: Record<Difficulty, number> = { beginner: 0, intermediate: 0, expert: 0 };
	for (const q of questions) acc[q.difficulty] += 1;
	return acc;
}
