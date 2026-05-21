import type { LessonTheoryModel } from "../../lib/buildAlgorithmLessonTheory";
import type { AlgorithmLessonOverrides } from "../useAlgorithmLessonOverrides";
import type { LessonContextForAI } from "../../../../../features/lessons/api/lessonTheoryInteractionsApi";

export function resolveOverriddenValues(
	model: LessonTheoryModel | null | undefined,
	overrides: AlgorithmLessonOverrides | null | undefined,
) {
	const modelAnalogy = model?.mainCards.find((c) => c.title.startsWith("Analogy"))?.body ?? "";
	return {
		keyIdea: overrides?.keyIdea ?? model?.keyIdea ?? "",
		analogy: overrides?.analogy ?? modelAnalogy,
		complexityExplainer: overrides?.complexityExplainer ?? model?.complexityExplainer ?? "",
	};
}

export function buildLessonContext(
	model: LessonTheoryModel | null | undefined,
	category: string | undefined,
	keyIdea: string,
	complexityExplainer: string,
): LessonContextForAI | null {
	if (!model) return null;
	return {
		subject: category ?? "computer-science",
		lessonType: "algorithm",
		title: model.title,
		mainContent: [
			keyIdea,
			model.steps.map((s) => `${s.title}: ${s.description}`).join(". "),
			complexityExplainer,
		].join("\n\n"),
		keyPoints: model.steps.map((s) => s.title),
	};
}

export function computeReadScore(stepsRevealed: boolean, miscRevealed: boolean): number {
	return (stepsRevealed ? 60 : 0) + (miscRevealed ? 40 : 0);
}
