import type { ReactNode } from "react";
import { LessonWatchContent } from "./watch/LessonWatchContent";
import VisualizerV2 from "../../../../features/computer-science/algorithms/visualizer-v2/VisualizerV2";
import { LessonQuizContentV2 } from "./quiz/LessonQuizContentV2";
import { ExerciseTab } from "./exercise/ExerciseTab";
import { hasCapability } from "./category-capabilities";
import { TheoryTabContent } from "./theory/theory-renderers";

export type TabRegistration = {
	render: () => ReactNode;
	isAvailable?: (category: string | undefined) => boolean;
};

export const TAB_REGISTRY: Record<string, TabRegistration> = {
	theoryTab: {
		render: () => <TheoryTabContent />,
	},

	vizTab: {
		isAvailable: (category) => hasCapability(category, "visualizer"),
		render: () => <VisualizerV2 />,
	},

	codeTab: {
		isAvailable: (category) => hasCapability(category, "code-playground"),
		render: () => (
			<div className="rounded-xl border border-(--border) p-5 text-sm text-(--text-secondary)">
				Code playground coming soon.
			</div>
		),
	},

	quizTab: {
		render: () => <LessonQuizContentV2 />,
	},

	watchTab: {
		render: () => <LessonWatchContent />,
	},

	exerciseTab: {
		isAvailable: (category) => hasCapability(category, "exercises"),
		render: () => <ExerciseTab />,
	},
};
