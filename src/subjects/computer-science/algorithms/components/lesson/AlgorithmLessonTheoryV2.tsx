// View pur — nu conține logică de date sau derivări.
// Toată orchestrarea e în useAlgorithmTheoryController.

import { useAlgorithmTheoryController } from "../../hooks/useAlgorithmTheoryController";
import "./lessonTheory.css";
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
import { TheoryFooter } from "./theory-v2/TheoryFooter";

const AlgorithmLessonTheoryV2 = ({
	lessonId: dbLessonIdProp = "",
	updatedAt,
}: {
	lessonId?: string;
	updatedAt?: string;
}) => {
	const { model, dbLessonId, keyIdea, analogy, complexityExplainer, G } =
		useAlgorithmTheoryController(dbLessonIdProp);

	if (!model) return null;

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

export default AlgorithmLessonTheoryV2;
