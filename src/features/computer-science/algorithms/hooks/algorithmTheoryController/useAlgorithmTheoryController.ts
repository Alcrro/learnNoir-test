import { useParams } from "react-router-dom";
import { useLessonTheoryModel } from "../useLessonTheoryModel";
import { useAlgorithmLessonOverrides } from "../useAlgorithmLessonOverrides";
import { useTheoryInteractionsEditor } from "../useTheoryInteractions";
import { useTheoryProgressReducer } from "../useTheoryProgressReducer";
import { useLessonEditStore } from "../../../../../features/lessons/store/useLessonEditStore";
import { useLessonContext } from "../../../../../features/lessons/context/LessonContext";
import { COMPONENT_LABELS } from "../../components/lesson/theory-v2/componentLabels";
import { useAlgorithmReadProgress } from "./useReadProgress";
import { resolveOverriddenValues, buildLessonContext } from "./lib";
import type { AlgorithmTheoryController, TheoryBlockProps } from "./types";
import type { TheoryInteractionComponentType } from "../../../../../features/lessons/api/lessonTheoryInteractionsApi";

export function useAlgorithmTheoryController(dbLessonIdProp = ""): AlgorithmTheoryController {
	const { category } = useParams<{ category: string }>();

	const { lessonId: contextLessonId } = useLessonContext();
	const dbLessonId = dbLessonIdProp || contextLessonId;

	const { model } = useLessonTheoryModel();
	const { overrides } = useAlgorithmLessonOverrides(dbLessonId);
	const isEditing = useLessonEditStore((s) => s.isEditing);

	const editor = useTheoryInteractionsEditor(isEditing ? dbLessonId : "");
	const { quizScore, completedCount, totalComponents, justCompleted, recordComplete } =
		useTheoryProgressReducer(isEditing ? "" : dbLessonId);

	const { onStepsReveal, onMiscReveal } = useAlgorithmReadProgress(dbLessonId, isEditing);
	const { keyIdea, analogy, complexityExplainer } = resolveOverriddenValues(model, overrides);
	const lessonContext = buildLessonContext(model, category, keyIdea, complexityExplainer);

	const G = (component: TheoryInteractionComponentType): TheoryBlockProps => ({
		component,
		label: COMPONENT_LABELS[component] ?? component,
		isEditing,
		interaction: editor.latestByComponent(component),
		isGenerating: editor.generatingComponent === component,
		isApproving: editor.approvingId === editor.latestByComponent(component)?.id,
		onGenerate: () => { if (lessonContext) void editor.generate(component, lessonContext); },
		onApprove: (id: string) => void editor.approve(id),
	});

	return {
		model, dbLessonId, isEditing, keyIdea, analogy, complexityExplainer, G,
		recordAttempt: recordComplete,
		quizScore, completedCount, totalComponents, justCompleted,
		onStepsReveal, onMiscReveal,
	};
}
