import { createContext, useContext } from "react";

type LessonEditContextValue = {
	canEdit: boolean;
};

export const LessonEditContext = createContext<LessonEditContextValue>({ canEdit: false });

export function useLessonEditContext() {
	return useContext(LessonEditContext);
}
