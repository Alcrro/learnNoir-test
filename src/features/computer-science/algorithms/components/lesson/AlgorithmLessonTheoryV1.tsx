import { useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { algorithms } from "../../data/algorithmsData";
import { getFallbackProgrammingCatalog } from "../../../catalog/data/programmingCatalogFallback";
import { buildAlgorithmLessonTheoryModel } from "../../lib/buildAlgorithmLessonTheory";
import { patchLessonProgress } from "../../api/progressApi";
import "./lessonTheory.css";

import { ConceptReveal } from "./theory-v1/ConceptReveal";
import { ThinkPrompt } from "./theory-v1/ThinkPrompt";
import { StepsReveal } from "./theory-v1/StepsReveal";
import { ComplexityPanel } from "./theory-v1/ComplexityPanel";
import { WhenToUsePanel } from "./theory-v1/WhenToUsePanel";
import { MisconceptionReveal } from "./theory-v1/MisconceptionReveal";
import type { ConfidenceLevel } from "./theory-v1/ConfidenceRating";

// Sidebar cards are shared — imported without modification
import { PrerequisitesCard } from "./theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "./theory/sidebar/RelatedLessonsCard";
import { MemoryTipCard } from "./theory/sidebar/MemoryTipCard";
import { NextLessonCard } from "./theory/sidebar/NextLessonCard";

function getThinkPrompts(lessonId: string): { steps: string; misconceptions: string } {
	if (lessonId.includes("bubble-sort")) {
		return {
			steps: "Before reading — if you had to sort [5, 1, 4, 2, 8] by only swapping adjacent out-of-order elements, what would you do first?",
			misconceptions:
				"What mistake do you think most people make when coding Bubble Sort for the first time?",
		};
	}
	if (lessonId.includes("binary-search")) {
		return {
			steps: "A sorted list has 100 numbers and you're looking for 42. Without checking each one — what's the fastest strategy to narrow it down?",
			misconceptions:
				"What assumption is usually wrong when people first implement Binary Search?",
		};
	}
	if (lessonId.includes("merge")) {
		return {
			steps: "You have two already-sorted lists. How would you combine them into one sorted list as efficiently as possible?",
			misconceptions: "What do most people forget when implementing Merge Sort?",
		};
	}
	if (lessonId.includes("quick")) {
		return {
			steps: "Pick any element from a list as a 'pivot'. How would you rearrange the other elements around it?",
			misconceptions: "What makes Quick Sort's worst case happen, and when should you watch out?",
		};
	}
	if (lessonId.includes("breadth-first")) {
		return {
			steps: "Starting from one node in a graph, how would you visit all its direct neighbors before going deeper?",
			misconceptions: "What happens if you forget to track visited nodes in BFS?",
		};
	}
	return {
		steps: "Before reading — what repeatable action do you think gets this algorithm closer to a solution on each step?",
		misconceptions:
			"What edge case or wrong assumption do you think catches people off guard with this algorithm?",
	};
}

const AlgorithmLessonTheoryV1 = () => {
	// Supports two URL shapes:
	// 1. AlgorithmPage route: /:category/:lessonId  (lessonId = "bubble-sort")
	// 2. LessonPage route:    /:category/:module/:lessonSlug  (lessonSlug = "bubble-sort-de-la-...")
	const { category, lessonId, lessonSlug } = useParams<{
		category: string;
		lessonId: string;
		lessonSlug: string;
	}>();

	const [stepsRevealed, setStepsRevealed] = useState(false);
	const [miscRevealed, setMiscRevealed] = useState(false);
	const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
	const lastSentScore = useRef(-1);

	const model = useMemo(() => {
		const cat =
			category === "algorithms" || category === "data-structures" ? category : "algorithms";
		const catalog = getFallbackProgrammingCatalog(cat);

		// Direct ID match (AlgorithmPage route) or prefix-match from full lesson slug (LessonPage route)
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

	// Resolve the effective lesson ID for tracking and prompts (same logic as in useMemo above).
	const trackingId = lessonId ?? model?.title.toLowerCase().replace(/\s+/g, "-");

	// readScore: steps=40 · confidence=30 · all-misc-revealed=30
	useEffect(() => {
		if (!trackingId || !model) return;
		const score =
			(stepsRevealed ? 40 : 0) + (confidence !== null ? 30 : 0) + (miscRevealed ? 30 : 0);
		if (score === lastSentScore.current) return;
		lastSentScore.current = score;
		patchLessonProgress(trackingId, {
			readScore: score,
			status: score === 100 ? "completed" : "in_progress",
		});
	}, [stepsRevealed, confidence, miscRevealed, trackingId, model]);

	if (!model) return null;

	const effectiveId = lessonId ?? lessonSlug ?? "";
	const prompts = getThinkPrompts(effectiveId);
	const analogy = model.mainCards.find((c) => c.title.startsWith("Analogy"))?.body;

	return (
		<div className="lesson-theory">
			<div className="lesson-theory__layout">
				<main className="lesson-theory__main">
					<ConceptReveal keyIdea={model.keyIdea} analogy={analogy} />

					<ThinkPrompt
						question={prompts.steps}
						revealLabel="I've thought about it — show me the steps →"
						onReveal={() => setStepsRevealed(true)}
					>
						<StepsReveal steps={model.steps} />
					</ThinkPrompt>

					<ComplexityPanel
						complexityCases={model.complexityCases}
						complexityExplainer={model.complexityExplainer}
						stepsRevealed={stepsRevealed}
						confidence={confidence}
						onConfidence={setConfidence}
					/>

					<WhenToUsePanel whenGood={model.whenGood} whenAvoid={model.whenAvoid} />

					<ThinkPrompt
						question={prompts.misconceptions}
						revealLabel="Reveal common mistakes →"
						onReveal={() => setMiscRevealed(true)}
					>
						<MisconceptionReveal misconceptions={model.misconceptions} />
					</ThinkPrompt>
				</main>

				<aside className="lesson-theory__sidebar">
					<PrerequisitesCard
						prerequisites={model.prerequisites}
						prereqNote={model.prereqNote}
					/>
					<RelatedLessonsCard relatedLessons={model.relatedLessons} />
					<MemoryTipCard title={model.title} sidebarCards={model.sidebarCards} />
					{model.nextLesson && <NextLessonCard nextLesson={model.nextLesson} />}
				</aside>
			</div>
		</div>
	);
};

export default AlgorithmLessonTheoryV1;
