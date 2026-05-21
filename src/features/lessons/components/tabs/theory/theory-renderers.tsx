import type { ReactNode } from "react";
import { LessonTheoryContent } from "./LessonTheoryContent";
import AlgorithmLessonTheoryV2 from "../../../../../features/computer-science/algorithms/components/lesson/AlgorithmLessonTheoryV2";
import type { TabContext } from "../tab-registry";

export type TheoryRenderer = (ctx: TabContext) => ReactNode;

const THEORY_RENDERERS: Partial<Record<string, TheoryRenderer>> = {
	algorithms: ({ lessonId, lessonUpdatedAt }) => (
		<AlgorithmLessonTheoryV2
			lessonId={lessonId}
			updatedAt={lessonUpdatedAt}
		/>
	),
	"data-structures": ({ lessonId, lessonUpdatedAt }) => (
		<AlgorithmLessonTheoryV2
			lessonId={lessonId}
			updatedAt={lessonUpdatedAt}
		/>
	),

	// mathematics: ({ contentBlocks, lessonId }) => <MathLessonTheory blocks={contentBlocks} lessonId={lessonId} />,
};

const defaultTheoryRenderer: TheoryRenderer = ({ contentBlocks, lessonId }) => (
	<LessonTheoryContent
		blocks={contentBlocks}
		lessonId={lessonId}
	/>
);

export function resolveTheoryRenderer(
	category: string | undefined,
): TheoryRenderer {
	return THEORY_RENDERERS[category ?? ""] ?? defaultTheoryRenderer;
}
