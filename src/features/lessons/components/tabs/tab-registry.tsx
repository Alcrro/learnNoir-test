// Registry-ul taburilor lecției.
// Fiecare intrare declară cum se randează tab-ul și, opțional, ce capability necesită.
// Dacă `isAvailable` lipsește → tab-ul e global (disponibil pentru orice categorie).

import type { ReactNode } from "react";
import type { ContentBlock, AssessmentBlock } from "../../api/lessonBlocksApi";
import { LessonTheoryContent } from "./LessonTheoryContent";
import { LessonQuizContent } from "./LessonQuizContent";
import { LessonWatchContent } from "./LessonWatchContent";
import VisualizerV2 from "../../../../subjects/computer-science/algorithms/visualizer-v2/VisualizerV2";
import AlgorithmLessonTheoryV2 from "../../../../subjects/computer-science/algorithms/components/lesson/AlgorithmLessonTheoryV2";

// ── context transmis fiecărui renderer ───────────────────────────────────────

export type TabContext = {
	category: string | undefined;
	lessonId: string;
	lessonUpdatedAt: string | undefined;
	contentBlocks: ContentBlock[];
	assessmentBlocks: AssessmentBlock[];
};

// ── structura unei înregistrări ───────────────────────────────────────────────

export type TabRegistration = {
	render: (ctx: TabContext) => ReactNode;
	// Dacă absent, tab-ul apare pentru orice categorie
	isAvailable?: (category: string | undefined) => boolean;
};

// ── capabilities: ce features suportă fiecare categorie ──────────────────────
// Adaugi o categorie nouă → o linie aici. Tab-urile verifică capabilities,
// nu nume de categorii — astfel nu trebuie modificate când apare o materie nouă.

type CategoryCapability = "visualizer" | "code-playground";

const CATEGORY_CAPABILITIES: Partial<Record<string, CategoryCapability[]>> = {
	algorithms: ["visualizer", "code-playground"],
	"data-structures": ["visualizer"],
	// mathematics: [],
	// graph-theory: ["visualizer"],
};

function hasCapability(category: string | undefined, cap: CategoryCapability): boolean {
	return (CATEGORY_CAPABILITIES[category ?? ""] ?? []).includes(cap);
}

// ── renderer-e specifice pentru theoryTab ─────────────────────────────────────
// Fiecare categorie cu un layout de teorie diferit față de cel generic
// înregistrează renderer-ul propriu. Lipsă = fallback la LessonTheoryContent.

type TheoryRenderer = (ctx: TabContext) => ReactNode;

const THEORY_RENDERERS: Partial<Record<string, TheoryRenderer>> = {
	algorithms: ({ lessonId, lessonUpdatedAt }) => (
		<AlgorithmLessonTheoryV2 lessonId={lessonId} updatedAt={lessonUpdatedAt} />
	),
	// "data-structures" folosește același renderer ca algoritmii
	"data-structures": ({ lessonId, lessonUpdatedAt }) => (
		<AlgorithmLessonTheoryV2 lessonId={lessonId} updatedAt={lessonUpdatedAt} />
	),
	// mathematics: ({ contentBlocks, lessonId }) => <MathLessonTheory blocks={contentBlocks} lessonId={lessonId} />,
};

const defaultTheoryRenderer: TheoryRenderer = ({ contentBlocks, lessonId }) => (
	<LessonTheoryContent blocks={contentBlocks} lessonId={lessonId} />
);

// ── registry ──────────────────────────────────────────────────────────────────

export const TAB_REGISTRY: Record<string, TabRegistration> = {
	theoryTab: {
		// Delegă la renderer-ul specific categoriei sau la fallback-ul generic
		render: (ctx) => (THEORY_RENDERERS[ctx.category ?? ""] ?? defaultTheoryRenderer)(ctx),
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
		render: ({ assessmentBlocks, lessonId }) => (
			<LessonQuizContent blocks={assessmentBlocks} lessonSlug={lessonId} />
		),
	},

	watchTab: {
		render: ({ lessonId }) => <LessonWatchContent lessonId={lessonId} />,
	},
};
