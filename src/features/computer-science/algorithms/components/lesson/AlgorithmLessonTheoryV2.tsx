import { useLessonTheoryModel } from "../../hooks/useLessonTheoryModel";
import { useAlgorithmLessonOverrides } from "../../hooks/useAlgorithmLessonOverrides";
import { useTheoryInteractionsEditor } from "../../hooks/useTheoryInteractions";
import { useLessonEditStore } from "../../../../lessons/store/useLessonEditStore";
import { useLessonDataStore } from "../../../../lessons/store/useLessonDataStore";
import { Clock } from "lucide-react";
import { formatRelative } from "../../../../../libs/utils/formatRelative";
import "../../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import "./theory-v2/theoryV2.css";

// V1 components reused as-is
import { ConceptReveal } from "./theory-v1/ConceptReveal";
import { ThinkPrompt } from "./theory-v1/ThinkPrompt";
import { StepsReveal } from "./theory-v1/StepsReveal";
import { MisconceptionReveal } from "./theory-v1/MisconceptionReveal";
import { PrerequisitesCard } from "./theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "./theory/sidebar/RelatedLessonsCard";
import { MemoryTipCard } from "./theory/sidebar/MemoryTipCard";
import { NextLessonCard } from "./theory/sidebar/NextLessonCard";

// V2 components
import { PredictPrompt } from "./theory-v2/PredictPrompt";
import { InlineConcreteExample } from "./theory-v2/InlineConcreteExample";
import { ElaborationPrompt } from "./theory-v2/ElaborationPrompt";
import { ComplexityDerivation } from "./theory-v2/ComplexityDerivation";
import { TransferScenario } from "./theory-v2/TransferScenario";
import { EmbeddedRecall } from "./theory-v2/EmbeddedRecall";
import { TheoryInteractionBlock } from "./theory-v2/TheoryInteractionBlock";

import type { LessonContextForAI } from "../../../../lessons/api/lessonTheoryInteractionsApi";
import { useParams } from "react-router-dom";

function TheoryFooter({ updatedAt }: { updatedAt?: string }) {
	return (
		<div className="mt-10 border-t border-(--border) pt-6">
			{updatedAt && (
				<div className="flex items-center gap-1.5 text-xs text-(--text-muted)">
					<Clock className="h-3.5 w-3.5" />
					Last updated {formatRelative(updatedAt)}
				</div>
			)}
		</div>
	);
}

const AlgorithmLessonTheoryV2 = ({
	lessonId: dbLessonIdProp = "",
	updatedAt,
}: {
	lessonId?: string;
	updatedAt?: string;
}) => {
	const { model } = useLessonTheoryModel();
	const { category } = useParams<{ category: string }>();

	// Use lesson from store if prop not provided
	const lessonFromStore = useLessonDataStore((s) => s.lesson);
	const dbLessonId = dbLessonIdProp || lessonFromStore?.id || "";

	const { overrides } = useAlgorithmLessonOverrides(dbLessonId);
	const isEditing = useLessonEditStore((s) => s.isEditing);

	const editor = useTheoryInteractionsEditor(isEditing ? dbLessonId : "");

	if (!model) return null;

	const modelAnalogy = model.mainCards.find((c) => c.title.startsWith("Analogy"))?.body ?? "";
	const keyIdea = overrides?.keyIdea ?? model.keyIdea;
	const analogy = overrides?.analogy ?? modelAnalogy;
	const complexityExplainer = overrides?.complexityExplainer ?? model.complexityExplainer;

	// Build lesson context for AI generation
	const lessonContext: LessonContextForAI = {
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

	const G = (component: Parameters<typeof editor.generate>[0]) => ({
		component,
		label: COMPONENT_LABELS[component],
		isEditing,
		interaction: editor.latestByComponent(component),
		isGenerating: editor.generatingComponent === component,
		isApproving: editor.approvingId === editor.latestByComponent(component)?.id,
		onGenerate: () => void editor.generate(component, lessonContext),
		onApprove: (id: string) => void editor.approve(id),
	});

	return (
		<div className="lesson-theory">
			<div className="lesson-theory__layout">
				<main className="lesson-theory__main">

					{/* ── FAZA 1: Hook & Predict ── */}
					<TheoryInteractionBlock {...G("predict_prompt")}>
						{model.predictPrompt && <PredictPrompt question={model.predictPrompt} />}
					</TheoryInteractionBlock>

					{/* ── FAZA 2: Concret întâi ── */}
					<TheoryInteractionBlock {...G("concrete_example")}>
						{model.inlineExample && (
							<InlineConcreteExample
								title={model.inlineExample.title}
								steps={model.inlineExample.steps}
								lessonId={dbLessonId}
							/>
						)}
					</TheoryInteractionBlock>

					{/* ── FAZA 3: Key Idea + elaborare ── */}
					<ConceptReveal keyIdea={keyIdea} analogy={analogy} />
					<TheoryInteractionBlock {...G("elaboration")}>
						{model.elaboration && (
							<ElaborationPrompt
								question={model.elaboration.question}
								answer={model.elaboration.answer}
								lessonId={dbLessonId}
							/>
						)}
					</TheoryInteractionBlock>

					{/* ── FAZA 4: Active Steps ── */}
					<ThinkPrompt
						question="Înainte de a citi pașii — ce acțiune repetabilă crezi că aduce algoritmul mai aproape de soluție la fiecare pas?"
						revealLabel="Am gândit — arată-mi pașii →"
					>
						<StepsReveal steps={model.steps} />
					</ThinkPrompt>

					{/* ── RECALL #1: după pași ── */}
					<TheoryInteractionBlock {...G("recall_1")}>
						{model.recallAfterSteps && (
							<EmbeddedRecall questions={model.recallAfterSteps} placedAfter="după pași" lessonId={dbLessonId} componentId="recall_1" />
						)}
					</TheoryInteractionBlock>

					{/* ── FAZA 5: Complexity Derivation ── */}
					<TheoryInteractionBlock {...G("interactive_exercise")}>
						{model.complexityDerivation && (
							<ComplexityDerivation
								estimateQuestion={model.complexityDerivation.estimateQuestion}
								estimateOptions={model.complexityDerivation.estimateOptions}
								derivationSteps={model.complexityDerivation.derivationSteps}
								complexityCases={model.complexityCases}
								complexityExplainer={complexityExplainer}
								lessonId={dbLessonId}
							/>
						)}
					</TheoryInteractionBlock>

					{/* ── RECALL #2: după complexitate ── */}
					<TheoryInteractionBlock {...G("recall_2")}>
						{model.recallAfterComplexity && (
							<EmbeddedRecall questions={model.recallAfterComplexity} placedAfter="după complexitate" lessonId={dbLessonId} componentId="recall_2" />
						)}
					</TheoryInteractionBlock>

					{/* ── FAZA 6: Transfer ── */}
					<TheoryInteractionBlock {...G("transfer")}>
						{model.transferScenarios && (
							<TransferScenario scenarios={model.transferScenarios} lessonId={dbLessonId} />
						)}
					</TheoryInteractionBlock>

					{/* ── FAZA 7: Misconceptions ── */}
					<ThinkPrompt
						question="Ai crezut vreodată că există un shortcut sau că complexitatea e mai bună decât pare? Reveal greșelile frecvente."
						revealLabel="Reveal common mistakes →"
					>
						<MisconceptionReveal misconceptions={model.misconceptions} />
					</ThinkPrompt>

					{/* ── FAZA 8: Final Recall ── */}
					<TheoryInteractionBlock {...G("recall_final")}>
						{model.recallFinal && (
							<EmbeddedRecall questions={model.recallFinal} placedAfter="recall final" lessonId={dbLessonId} componentId="recall_final" />
						)}
					</TheoryInteractionBlock>

					<TheoryFooter updatedAt={updatedAt} />
				</main>

				<aside className="lesson-theory__sidebar">
					<PrerequisitesCard prerequisites={model.prerequisites} prereqNote={model.prereqNote} />
					<RelatedLessonsCard relatedLessons={model.relatedLessons} />
					<MemoryTipCard title={model.title} sidebarCards={model.sidebarCards} />
					{model.nextLesson && <NextLessonCard nextLesson={model.nextLesson} />}
				</aside>
			</div>
		</div>
	);
};

const COMPONENT_LABELS: Record<string, string> = {
	predict_prompt: "Predicție inițială",
	concrete_example: "Exemplu concret",
	elaboration: "Elaborare — De ce funcționează",
	interactive_exercise: "Exercițiu interactiv (complexitate)",
	recall_1: "Recall 1 — după pași",
	recall_2: "Recall 2 — după complexitate",
	transfer: "Transfer — scenarii reale",
	recall_final: "Recall final",
};

export default AlgorithmLessonTheoryV2;
