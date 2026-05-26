import { createContext, useContext } from "react";
import type { ContentBlock, AssessmentBlock } from "../api/lessonBlocksApi";

export type LessonTabData = {
	category: string | undefined;
	lessonId: string;
	lessonSlug: string;
	lessonUpdatedAt: string | undefined;
	contentBlocks: ContentBlock[];
	assessmentBlocks: AssessmentBlock[];
};

const LessonTabContext = createContext<LessonTabData | null>(null);

export function useLessonTabContext(): LessonTabData {
	const ctx = useContext(LessonTabContext);
	if (!ctx) throw new Error("useLessonTabContext must be used within LessonTabContext.Provider");
	return ctx;
}

export default LessonTabContext;
