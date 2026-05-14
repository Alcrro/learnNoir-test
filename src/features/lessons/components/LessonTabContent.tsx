// Dispatcher pentru tab-urile lecției.
// Nu conține logică de randare — rutează tab-ul activ spre înregistrarea din TAB_REGISTRY.
// Adaugi un tab nou sau modifici disponibilitatea lui: editezi doar tab-registry.tsx.

import { useParams } from "react-router-dom";
import { useLessonPageQuery } from "../hooks/useLessonPageQuery";
import { useLessonDataStore } from "../store/useLessonDataStore";
import type { ContentBlock, AssessmentBlock } from "../api/lessonBlocksApi";
import { TAB_REGISTRY } from "./tabs/tab-registry";

const LessonTabContent = () => {
	const { category } = useParams<{ category: string }>();
	const { tab } = useLessonPageQuery();
	const lesson = useLessonDataStore((s) => s.lesson);
	const blocks = useLessonDataStore((s) => s.blocks);

	const lessonId = lesson?.id ?? "";
	const lessonUpdatedAt = lesson?.updatedAt;

	const contentBlocks = blocks.filter((b): b is ContentBlock => b.type === "content");
	const assessmentBlocks = blocks.filter(
		(b): b is AssessmentBlock => b.type === "assessment" && b.engine !== "quiz:code",
	);

	const registration = tab ? TAB_REGISTRY[tab] : undefined;

	// Tab necunoscut sau indisponibil pentru categoria curentă
	if (!registration || registration.isAvailable?.(category) === false) return null;

	return (
		<>
			{registration.render({ category, lessonId, lessonUpdatedAt, contentBlocks, assessmentBlocks })}
		</>
	);
};

export default LessonTabContent;
