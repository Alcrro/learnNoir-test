import type { ReactNode } from "react";
import { LessonWatchContent } from "./watch/LessonWatchContent";
import VisualizerV2 from "../../../../features/computer-science/algorithms/visualizer-v2/VisualizerV2";
import { BubbleSortStepVisualizer } from "../../../../features/computer-science/algorithms/bubble-sort/visualization/BubbleSortStepVisualizer";
import MergeSortVisualizer from "../../../../features/computer-science/merge-sort/MergeSortVisualizer";
import EventLoopVisualizer from "../../../../features/computer-science/event-loop/EventLoopVisualizer";
import { LessonQuizContentV2 } from "./quiz/LessonQuizContentV2";
import { ExerciseTab } from "./exercise/ExerciseTab";
import { hasCapability } from "./category-capabilities";
import { TheoryTabContent } from "./theory/theory-renderers";
import { useLessonTabContext } from "../../context/LessonTabContext";
import { useLessonBlocksQuery } from "../../hooks/useLessonBlocksQuery";
import { DiagramTab } from "./diagram/DiagramTab";

export type TabRegistration = {
	render: () => ReactNode;
	isAvailable?: (category: string | undefined) => boolean;
};

function VizTabContent() {
	const { lessonId } = useLessonTabContext();
	const { data: blocks = [] } = useLessonBlocksQuery(lessonId);

	const hasEventLoop = blocks.some(
		(b) => b.type === "interactive" && b.engine === "visualizer:event-loop",
	);
	const hasBubbleSort = blocks.some(
		(b) => b.type === "interactive" && b.engine === "algorithm:bubble-sort",
	);
	const hasMergeSort = blocks.some(
		(b) => b.type === "interactive" && b.engine === "algorithm:merge-sort",
	);

	if (hasEventLoop) return <EventLoopVisualizer />;

	return (
		<div className="flex flex-col gap-8">
			<VisualizerV2 />
			{hasBubbleSort && (
				<>
					<div className="border-t border-(--border)" />
					<BubbleSortStepVisualizer />
				</>
			)}
			{hasMergeSort && (
				<>
					<div className="border-t border-(--border)" />
					<MergeSortVisualizer />
				</>
			)}
		</div>
	);
}

export const TAB_REGISTRY: Record<string, TabRegistration> = {
	theoryTab: {
		render: () => <TheoryTabContent />,
	},

	vizTab: {
		isAvailable: (category) => hasCapability(category, "visualizer"),
		render: () => <VizTabContent />,
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

	diagramTab: {
		render: () => <DiagramTab />,
	},
};
