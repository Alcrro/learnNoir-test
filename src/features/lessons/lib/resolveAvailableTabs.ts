import { ALL_LESSON_TABS, type LessonTabId } from "../hooks/useLessonPageQuery";
import type { LessonBlock } from "../api/lessonBlocksApi";

export function resolveAvailableTabs(blocks: LessonBlock[]) {
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
	if (hasContent || blocks.length === 0) allowed.add("theoryTab");
	if (hasViz) allowed.add("vizTab");
	if (hasCode) allowed.add("codeTab");
	if (hasQuiz) allowed.add("quizTab");
	if (hasContent) allowed.add("watchTab");

	if (allowed.size === 0) allowed.add("theoryTab");

	return ALL_LESSON_TABS.filter((t) => allowed.has(t.uniqueId));
}
