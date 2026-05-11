import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { useLessonBlocksQuery } from "./useLessonBlocksQuery";
import { useLessonProgressQuery } from "./useLessonProgressQuery";
import { useLessonPageQuery } from "./useLessonPageQuery";
import { useLessonPermissions } from "./useLessonPermissions";
import { useLessonEdit } from "./useLessonEdit";
import { useLessonAI } from "./useLessonAI";
import { resolveAvailableTabs } from "../utils/resolveAvailableTabs";

const EMPTY_LESSON = {
	id: "", moduleId: "", title: "", slug: "", description: null,
	durationSeconds: 0, position: null, isActive: true,
	status: "draft" as const, authors: [], createdAt: "", updatedAt: "",
};

export function useLessonPageController(lessonSlug: string) {
	const { data: lesson, isLoading: loadingLesson, isError } = useLessonBySlugQuery(lessonSlug);
	const { data: blocks = [], isLoading: loadingBlocks } = useLessonBlocksQuery(lesson?.id ?? "");
	const { data: progress } = useLessonProgressQuery(lesson?.id ?? "");
	const { tab, setTab } = useLessonPageQuery();
	const { canEdit } = useLessonPermissions(lesson);

	const edit = useLessonEdit(lesson ?? EMPTY_LESSON);
	const ai = useLessonAI();

	const availableTabs = resolveAvailableTabs(blocks);
	const activeTab = availableTabs.some((t) => t.uniqueId === tab)
		? tab
		: (availableTabs[0]?.uniqueId ?? "theoryTab");

	const handleImproveTitle = async () => {
		const result = await ai.improveField("title", edit.title, `Lesson: ${lesson?.title}`);
		if (result) edit.setTitle(result);
	};

	const handleImproveDescription = async () => {
		const result = await ai.improveField("description", edit.description, `Lesson: ${lesson?.title}`);
		if (result) edit.setDescription(result);
	};

	const handleReview = () => {
		void ai.reviewLesson({
			title: edit.title,
			description: edit.description,
			content: lesson?.description ?? "",
		});
	};

	return {
		lesson,
		loadingLesson,
		isError,
		blocks,
		loadingBlocks,
		progress,
		tab,
		setTab,
		canEdit,
		edit,
		ai,
		availableTabs,
		activeTab,
		handleImproveTitle,
		handleImproveDescription,
		handleReview,
	};
}
