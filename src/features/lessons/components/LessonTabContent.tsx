// Dispatcher pentru tab-urile lecției.
// Nu conține logică de randare — rutează tab-ul activ spre înregistrarea din TAB_REGISTRY.
// Adaugi un tab nou sau modifici disponibilitatea lui: editezi doar tab-registry.tsx.

import { useParams } from "react-router-dom";
import { useLessonPageQuery } from "../hooks/useLessonPageQuery";
import { useLessonContext } from "../context/LessonContext";
import { useLessonBySlugQuery } from "../hooks/useLessonBySlugQuery";
import { useLessonBlocksQuery } from "../hooks/useLessonBlocksQuery";
import type { ContentBlock, AssessmentBlock } from "../api/lessonBlocksApi";
import { TAB_REGISTRY } from "./tabs/tab-registry";
import LessonTabContext from "../context/LessonTabContext";

const LessonTabContent = () => {
	const { category } = useParams<{ category: string }>();
	const { tab } = useLessonPageQuery();
	const { lessonSlug, lessonId } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const { data: blocks = [] } = useLessonBlocksQuery(lessonId);

	const lessonUpdatedAt = lesson?.updatedAt;

	const contentBlocks = blocks.filter((b): b is ContentBlock => b.type === "content");
	const assessmentBlocks = blocks.filter(
		(b): b is AssessmentBlock => b.type === "assessment" && b.engine !== "quiz:code",
	);

	const registration = tab ? TAB_REGISTRY[tab] : undefined;

	if (!registration || registration.isAvailable?.(category) === false) return null;

	return (
		<LessonTabContext.Provider value={{ category, lessonId, lessonSlug, lessonUpdatedAt, contentBlocks, assessmentBlocks }}>
			{registration.render()}
		</LessonTabContext.Provider>
	);
};

export default LessonTabContent;
