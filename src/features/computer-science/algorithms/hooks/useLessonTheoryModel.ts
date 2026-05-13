import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { algorithms } from "../data/algorithmsData";
import { getFallbackProgrammingCatalog } from "../../catalog/data/programmingCatalogFallback";
import { buildAlgorithmLessonTheoryModel } from "../lib/buildAlgorithmLessonTheory";
import { useApprovedTheoryInteractions } from "./useTheoryInteractions";
import { useLessonDataStore } from "../../../../features/lessons/store/useLessonDataStore";
import type { LessonTheoryModel, LessonConcreteStep, LessonRecallQuestion, LessonTransferScenario } from "../lib/buildAlgorithmLessonTheory";
import type { TheoryInteractionDTO } from "../../../lessons/api/lessonTheoryInteractionsApi";

function mergeInteractions(model: LessonTheoryModel, interactions: TheoryInteractionDTO[]): LessonTheoryModel {
	if (!interactions.length) return model;

	const byComponent = Object.fromEntries(
		interactions.map((i) => [i.componentType, i.content as Record<string, unknown>]),
	);

	const get = (key: string) => byComponent[key];

	return {
		...model,
		predictPrompt: (get("predict_prompt")?.["question"] as string | undefined) ?? model.predictPrompt,
		inlineExample: get("concrete_example")
			? {
					title: get("concrete_example")?.["title"] as string | undefined,
					steps: (get("concrete_example")?.["steps"] as LessonConcreteStep[] | undefined) ?? [],
			  }
			: model.inlineExample,
		elaboration: get("elaboration")
			? {
					question: (get("elaboration")?.["question"] as string) ?? "",
					answer: (get("elaboration")?.["answer"] as string) ?? "",
			  }
			: model.elaboration,
		complexityDerivation: (() => {
			const raw = get("interactive_exercise");
			const data = (raw?.["data"] ?? raw) as Record<string, unknown> | undefined;
			if (!data) return model.complexityDerivation;
			return {
				estimateQuestion: (data["estimateQuestion"] as string) ?? "",
				estimateOptions: (data["estimateOptions"] as string[]) ?? [],
				derivationSteps: (data["derivationSteps"] as LessonTheoryModel["complexityDerivation"] extends undefined ? never : NonNullable<LessonTheoryModel["complexityDerivation"]>["derivationSteps"]) ?? [],
			};
		})(),
		transferScenarios: (() => {
			const raw = get("transfer");
			if (!raw) return model.transferScenarios;
			// AI returns { scenarios: [...] }; fall back to raw if it's already an array
			const arr = Array.isArray(raw)
				? raw
				: Array.isArray(raw["scenarios"])
					? raw["scenarios"]
					: null;
			return (arr as LessonTransferScenario[] | null) ?? model.transferScenarios;
		})(),
		recallAfterSteps: (() => {
			const raw = get("recall_1");
			if (!raw) return model.recallAfterSteps;
			const arr = Array.isArray(raw) ? raw : Array.isArray(raw["questions"]) ? raw["questions"] : null;
			return (arr as LessonRecallQuestion[] | null) ?? model.recallAfterSteps;
		})(),
		recallAfterComplexity: (() => {
			const raw = get("recall_2");
			if (!raw) return model.recallAfterComplexity;
			const arr = Array.isArray(raw) ? raw : Array.isArray(raw["questions"]) ? raw["questions"] : null;
			return (arr as LessonRecallQuestion[] | null) ?? model.recallAfterComplexity;
		})(),
		recallFinal: (() => {
			const raw = get("recall_final");
			if (!raw) return model.recallFinal;
			const arr = Array.isArray(raw) ? raw : Array.isArray(raw["questions"]) ? raw["questions"] : null;
			return (arr as LessonRecallQuestion[] | null) ?? model.recallFinal;
		})(),
	};
}

export function useLessonTheoryModel() {
	const { category, lessonId, lessonSlug } = useParams<{
		category: string;
		lessonId: string;
		lessonSlug: string;
	}>();

	const dbLessonId = useLessonDataStore((s) => s.lesson?.id ?? "");
	const { data: approvedInteractions = [] } = useApprovedTheoryInteractions(dbLessonId);

	const model = useMemo(() => {
		const cat =
			category === "algorithms" || category === "data-structures" ? category : "algorithms";
		const catalog = getFallbackProgrammingCatalog(cat);

		const effectiveLessonId =
			lessonId ??
			catalog.lessons.find((l) => (lessonSlug ?? "").startsWith(l.id))?.id;

		if (!effectiveLessonId) return null;

		const lesson = catalog.lessons.find((l) => l.id === effectiveLessonId);
		if (!lesson) return null;

		const algorithmDetail =
			category === "algorithms"
				? algorithms.find((a) => a.id === effectiveLessonId)
				: undefined;

		const groupLessons = catalog.lessons
			.filter((l) => l.group === lesson.group)
			.sort((a, b) => a.sortOrder - b.sortOrder);

		return buildAlgorithmLessonTheoryModel({
			lesson,
			algorithmDetail: algorithmDetail
				? {
						id: algorithmDetail.id,
						group: algorithmDetail.group,
						prerequisites: algorithmDetail.prerequisites,
						estimatedTime: algorithmDetail.estimatedTime,
					}
				: { id: lesson.id },
			relatedLessons: groupLessons.filter((l) => l.id !== lesson.id),
			allLessonsInGroup: groupLessons,
		});
	}, [category, lessonId, lessonSlug]);

	// Merge approved DB interactions over the client-built model
	const modelWithInteractions = useMemo(
		() => (model ? mergeInteractions(model, approvedInteractions) : model),
		[model, approvedInteractions],
	);

	const trackingId = lessonId ?? model?.title.toLowerCase().replace(/\s+/g, "-");

	return { model: modelWithInteractions, trackingId, lessonId, lessonSlug };
}
