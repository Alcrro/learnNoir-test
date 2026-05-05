import { useParams } from "react-router-dom";
import LessonPageLayout from "./LessonPageLayout";
import { LessonFeatureTabs } from "../components/LessonFeatureTabs";
import { useLessonBySlugQuery } from "../hooks/useLessonBySlugQuery";
import { useLessonBlocksQuery } from "../hooks/useLessonBlocksQuery";
import { useLessonProgressQuery } from "../hooks/useLessonProgressQuery";
import {
	useLessonPageQuery,
	ALL_LESSON_TABS,
} from "../hooks/useLessonPageQuery";
import type { LessonTabId } from "../hooks/useLessonPageQuery";
import { LessonTheoryContent } from "../components/tabs/LessonTheoryContent";
import { LessonQuizContent } from "../components/tabs/LessonQuizContent";
import type {
	ContentBlock,
	AssessmentBlock,
	LessonBlock,
} from "../api/lessonBlocksApi";
import Visualizer from "../../computer-science/algorithms/bubble-sort/visualization/Visualizer";
import { Clock, Trophy } from "lucide-react";

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function LessonHeader({
	title,
	description,
	durationSeconds,
	score,
}: {
	title: string;
	description: string | null;
	durationSeconds: number;
	score: number | undefined;
}) {
	const mins = durationSeconds > 0 ? Math.round(durationSeconds / 60) : null;

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-semibold capitalize tracking-tight text-(--text-primary)">
				{title}
			</h1>
			{description && (
				<p className="text-sm text-(--text-secondary) max-w-2xl">{description}</p>
			)}
			<div className="flex flex-wrap items-center gap-4 text-xs text-(--text-muted)">
				{mins && (
					<div className="flex items-center gap-1">
						<Clock className="h-3.5 w-3.5" />
						<span>~{mins} min</span>
					</div>
				)}
				{score !== undefined && (
					<div className="flex items-center gap-1">
						<Trophy className="h-3.5 w-3.5" />
						<span>{score}% score</span>
					</div>
				)}
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Determine which tabs are available for this lesson's block set.
// Theory is always shown; the rest require at least one matching block.
// ---------------------------------------------------------------------------

function resolveAvailableTabs(blocks: LessonBlock[]) {
	const hasContent = blocks.some((b) => b.type === "content");
	const hasViz = blocks.some(
		(b) => b.type === "interactive" && b.engine.startsWith("algorithm:"),
	);
	const hasCode = blocks.some(
		(b) =>
			(b.type === "interactive" && !b.engine.startsWith("algorithm:")) ||
			(b.type === "assessment" && b.engine === "quiz:code"),
	);
	const hasQuiz = blocks.some(
		(b) => b.type === "assessment" && b.engine !== "quiz:code",
	);

	const allowed = new Set<LessonTabId>();
	// Theory always shown — fallback to lesson title/description when no content blocks.
	if (hasContent || blocks.length === 0) allowed.add("theoryTab");
	if (hasViz) allowed.add("vizTab");
	if (hasCode) allowed.add("codeTab");
	if (hasQuiz) allowed.add("quizTab");

	// Always keep at least the theory tab so the page is never empty.
	if (allowed.size === 0) allowed.add("theoryTab");

	return ALL_LESSON_TABS.filter((t) => allowed.has(t.uniqueId));
}

// ---------------------------------------------------------------------------
// Tab content switcher
// ---------------------------------------------------------------------------

function TabContent({
	tab,
	blocks,
	lessonId,
}: {
	tab: LessonTabId;
	blocks: LessonBlock[];
	lessonId: string;
}) {
	const contentBlocks = blocks.filter(
		(b): b is ContentBlock => b.type === "content",
	);
	const assessmentBlocks = blocks.filter(
		(b): b is AssessmentBlock =>
			b.type === "assessment" && b.engine !== "quiz:code",
	);

	switch (tab) {
		case "theoryTab":
			return <LessonTheoryContent blocks={contentBlocks} />;
		case "vizTab":
			// Reuse the existing Visualizer — it reads state from the algorithm Zustand store.
			return <Visualizer />;
		case "codeTab":
			return (
				<div className="rounded-xl border border-(--border) p-5 text-sm text-(--text-secondary)">
					Code playground coming soon.
				</div>
			);
		case "quizTab":
			return (
				<LessonQuizContent
					blocks={assessmentBlocks}
					lessonId={lessonId}
				/>
			);
		default:
			return null;
	}
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const LessonPage = () => {
	const { lessonId: lessonSlug = "" } = useParams<{ lessonId: string }>();
	console.log("les");

	const {
		data: lesson,
		isLoading: loadingLesson,
		isError,
	} = useLessonBySlugQuery(lessonSlug);
	const { data: blocks = [], isLoading: loadingBlocks } = useLessonBlocksQuery(
		lesson?.id ?? "",
	);
	console.log(blocks);

	const { data: progress } = useLessonProgressQuery(lesson?.id ?? "");

	const { tab, setTab } = useLessonPageQuery();

	if (loadingLesson) {
		return (
			<div className="py-4 text-sm text-(--text-muted)">Loading lesson…</div>
		);
	}

	if (isError || !lesson) {
		return (
			<div className="py-4 text-sm text-(--text-muted)">Lesson not found.</div>
		);
	}

	const availableTabs = resolveAvailableTabs(blocks);

	// Default to the first available tab if the current URL param is not in the list.
	const activeTab = availableTabs.some((t) => t.uniqueId === tab)
		? tab
		: (availableTabs[0]?.uniqueId ?? "theoryTab");
	console.log({ activeTab });

	return (
		<LessonPageLayout
			header={
				<LessonHeader
					title={lesson.title}
					description={lesson.description}
					durationSeconds={lesson.durationSeconds}
					score={progress?.weightedScore}
				/>
			}
			tabs={
				loadingBlocks ? null : (
					<LessonFeatureTabs
						tabs={availableTabs}
						tabHandler={setTab}
					/>
				)
			}
			content={
				loadingBlocks ? (
					<div className="text-sm text-(--text-muted)">Loading content…</div>
				) : (
					<TabContent
						tab={activeTab}
						blocks={blocks}
						lessonId={lesson.id}
					/>
				)
			}
		/>
	);
};

export default LessonPage;
