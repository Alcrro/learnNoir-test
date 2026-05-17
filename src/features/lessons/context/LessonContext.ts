import { createContext, useContext } from "react";

type LessonContextValue = {
	lessonSlug: string;
	lessonId: string;
	canEdit: boolean;
};

const LessonContext = createContext<LessonContextValue | null>(null);

export function useLessonContext(): LessonContextValue {
	const ctx = useContext(LessonContext);
	if (!ctx) throw new Error("useLessonContext must be used within a LessonContext.Provider");
	return ctx;
}

export default LessonContext;
