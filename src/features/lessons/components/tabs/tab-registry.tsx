import type { ReactNode } from "react";
import type { ContentBlock, AssessmentBlock } from "../../api/lessonBlocksApi";
import { LessonWatchContent } from "./LessonWatchContent";
import VisualizerV2 from "../../../../subjects/computer-science/algorithms/visualizer-v2/VisualizerV2";
import { LessonQuizContentV2 } from "./LessonQuizContentV2";
import { ExerciseTab } from "./exercise/ExerciseTab";
import { hasCapability } from "./category-capabilities";
import { resolveTheoryRenderer } from "./theory-renderers";

export type TabContext = {
	category: string | undefined;
	lessonId: string;
	lessonSlug: string;
	lessonUpdatedAt: string | undefined;
	contentBlocks: ContentBlock[];
	assessmentBlocks: AssessmentBlock[];
};

export type TabRegistration = {
	render: (ctx: TabContext) => ReactNode;
	isAvailable?: (category: string | undefined) => boolean;
};

export const TAB_REGISTRY: Record<string, TabRegistration> = {
	theoryTab: {
		render: (ctx) => resolveTheoryRenderer(ctx.category)(ctx),
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
		render: ({ assessmentBlocks, lessonSlug, lessonId }) => (
			<LessonQuizContentV2 blocks={assessmentBlocks} lessonSlug={lessonSlug} lessonId={lessonId} />
		),
	},

	watchTab: {
		render: ({ lessonId }) => <LessonWatchContent lessonId={lessonId} />,
	},

	exerciseTab: {
		isAvailable: (category) => hasCapability(category, "exercises"),
		render: ({ lessonId }) => <ExerciseTab lessonId={lessonId} />,
	},
};
