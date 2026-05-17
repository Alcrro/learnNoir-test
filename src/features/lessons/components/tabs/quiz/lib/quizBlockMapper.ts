import { maxPoints } from "./quizScoring";
import type { AssessmentBlock } from "../../../../api/lessonBlocksApi";
import type { Difficulty, MockQuiz, QuizQuestion, QuizSummaryItem, QuizStatus } from "./quizTypes";

type BlockData = {
	title?: string;
	description?: string;
	difficulty?: Difficulty;
	quizId?: string;
	questions?: QuizQuestion[];
};

function quizForBlock(block: AssessmentBlock, data: BlockData): MockQuiz | undefined {
	if (data.questions && data.questions.length > 0) {
		return { title: data.title ?? "Quiz", questions: data.questions };
	}
	// legacy fallback — blocks without questions array yet
	if (block.engine.startsWith("quiz:")) return undefined;
	return undefined;
}

export function blocksToQuizList(
	blocks: AssessmentBlock[],
	lessonTitle?: string,
	blockScores: Map<string, number> = new Map(),
): QuizSummaryItem[] {
	return blocks.map((block, i) => {
		const data = block.data as BlockData;
		const quiz = quizForBlock(block, data);

		const title = data.title ?? (lessonTitle ? `${lessonTitle} — Part ${i + 1}` : `Quiz ${i + 1}`);
		const savedScore = blockScores.get(block.id);
		const status: QuizStatus = savedScore !== undefined && savedScore >= 70 ? "completed" : "available";
		const score = savedScore !== undefined && savedScore > 0 ? savedScore : undefined;

		return {
			id: block.id,
			title,
			description: data.description ?? "",
			primaryDifficulty: data.difficulty ?? "intermediate",
			questionCount: quiz?.questions.length ?? 0,
			maxPoints: quiz ? maxPoints(quiz.questions) : 0,
			estimatedMinutes: quiz ? Math.max(1, Math.ceil(quiz.questions.length * 0.75)) : 5,
			status,
			score,
			quiz,
		};
	});
}
