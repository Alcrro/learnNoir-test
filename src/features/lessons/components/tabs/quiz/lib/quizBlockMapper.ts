import { maxPoints } from "./quizScoring";
import type { AssessmentBlock } from "../../../../api/lessonBlocksApi";
import type { Difficulty, MockQuiz, QuizQuestion, QuizSummaryItem, QuizStatus } from "./quizTypes";
import type { TranslatedBlockPayload, TranslatedQuizQuestion } from "@shared/lesson-translation";

type BlockData = {
	title?: string;
	description?: string;
	difficulty?: Difficulty;
	quizId?: string;
	questions?: QuizQuestion[];
};

function mergeTranslatedQuestion(
	original: QuizQuestion,
	translated: TranslatedQuizQuestion,
): QuizQuestion {
	if (original.type === "mcq") {
		return {
			...original,
			question: translated.question,
			options: original.options.map((opt, i) => translated.options[i]?.text ?? opt),
		};
	}
	if (original.type === "input") {
		return { ...original, question: translated.question };
	}
	// drag-drop: sentence is the main readable text, mapped to translated.question
	return { ...original, sentence: translated.question };
}

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
	translatedBlocksMap: Map<string, TranslatedBlockPayload> = new Map(),
): QuizSummaryItem[] {
	return blocks.map((block, i) => {
		const data = block.data as BlockData;
		const quiz = quizForBlock(block, data);

		const translatedQuestions = translatedBlocksMap.get(block.id)?.questions;
		const translatedQuiz: MockQuiz | undefined =
			quiz && translatedQuestions && translatedQuestions.length > 0
				? {
						...quiz,
						questions: quiz.questions.map((q, qi) => {
							const tq = translatedQuestions[qi];
							return tq ? mergeTranslatedQuestion(q, tq) : q;
						}),
					}
				: quiz;

		const title = data.title ?? (lessonTitle ? `${lessonTitle} — Part ${i + 1}` : `Quiz ${i + 1}`);
		const savedScore = blockScores.get(block.id);
		const status: QuizStatus = savedScore !== undefined && savedScore >= 70 ? "completed" : "available";
		const score = savedScore !== undefined && savedScore > 0 ? savedScore : undefined;

		return {
			id: block.id,
			title,
			description: data.description ?? "",
			primaryDifficulty: data.difficulty ?? "intermediate",
			questionCount: translatedQuiz?.questions.length ?? 0,
			maxPoints: translatedQuiz ? maxPoints(translatedQuiz.questions) : 0,
			estimatedMinutes: translatedQuiz ? Math.max(1, Math.ceil(translatedQuiz.questions.length * 0.75)) : 5,
			status,
			score,
			quiz: translatedQuiz,
		};
	});
}
