import type { LessonTheoryModel } from "../../lib/buildAlgorithmLessonTheory";
import type { TheoryInteractionComponentType, TheoryInteractionDTO } from "../../../../../features/lessons/api/lessonTheoryInteractionsApi";

export type TheoryBlockProps = {
	component: TheoryInteractionComponentType;
	label: string;
	isEditing: boolean;
	interaction: TheoryInteractionDTO | undefined;
	isGenerating: boolean;
	isApproving: boolean;
	onGenerate: () => void;
	onApprove: (id: string) => void;
};

export type AlgorithmTheoryController = {
	model: LessonTheoryModel | null;
	dbLessonId: string;
	isEditing: boolean;
	keyIdea: string;
	analogy: string;
	complexityExplainer: string;
	G: (component: TheoryInteractionComponentType) => TheoryBlockProps;
	recordAttempt: (component: TheoryInteractionComponentType) => void;
	quizScore: number;
	completedCount: number;
	totalComponents: number;
	justCompleted: boolean;
	onStepsReveal: () => void;
	onMiscReveal: () => void;
};
