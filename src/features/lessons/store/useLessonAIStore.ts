import { create } from "zustand";
import { lessonAIApi, type LessonReviewResult } from "../api/lessonAIApi";
import { useLessonDataStore } from "./useLessonDataStore";
import { useLessonEditStore } from "./useLessonEditStore";

type AIState<T> = { data: T | null; loading: boolean; error: string | null };
const idle = <T>(): AIState<T> => ({ data: null, loading: false, error: null });

type LessonAIStore = {
	improveState: Record<string, AIState<string>>;
	reviewState: AIState<LessonReviewResult>;
	improveField: (fieldKey: string, text: string, context?: string) => Promise<string | null>;
	handleImproveTitle: () => Promise<void>;
	handleImproveDescription: () => Promise<void>;
	reviewLesson: (payload: { title: string; description: string; content: string }) => Promise<void>;
	handleReview: () => void;
	clearReview: () => void;
	reset: () => void;
};

const initialState = {
	improveState: {},
	reviewState: idle<LessonReviewResult>(),
} satisfies Partial<LessonAIStore>;

export const useLessonAIStore = create<LessonAIStore>((set, get) => ({
	...initialState,

	improveField: async (fieldKey, text, context) => {
		set((s) => ({
			improveState: { ...s.improveState, [fieldKey]: { data: null, loading: true, error: null } },
		}));
		try {
			const result = await lessonAIApi.improve(text, context);
			set((s) => ({
				improveState: { ...s.improveState, [fieldKey]: { data: result, loading: false, error: null } },
			}));
			return result;
		} catch {
			set((s) => ({
				improveState: {
					...s.improveState,
					[fieldKey]: { data: null, loading: false, error: "AI request failed" },
				},
			}));
			return null;
		}
	},

	handleImproveTitle: async () => {
		const { editTitle } = useLessonEditStore.getState();
		const { lesson } = useLessonDataStore.getState();
		const result = await get().improveField("title", editTitle, `Lesson: ${lesson?.title}`);
		if (result) useLessonEditStore.getState().setEditTitle(result);
	},

	handleImproveDescription: async () => {
		const { editDescription } = useLessonEditStore.getState();
		const { lesson } = useLessonDataStore.getState();
		const result = await get().improveField("description", editDescription, `Lesson: ${lesson?.title}`);
		if (result) useLessonEditStore.getState().setEditDescription(result);
	},

	reviewLesson: async (payload) => {
		set({ reviewState: { data: null, loading: true, error: null } });
		try {
			const result = await lessonAIApi.review(payload);
			set({ reviewState: { data: result, loading: false, error: null } });
		} catch {
			set({ reviewState: { data: null, loading: false, error: "AI review failed" } });
		}
	},

	handleReview: () => {
		const { editTitle, editDescription } = useLessonEditStore.getState();
		const { lesson } = useLessonDataStore.getState();
		void get().reviewLesson({
			title: editTitle,
			description: editDescription,
			content: lesson?.description ?? "",
		});
	},

	clearReview: () => set({ reviewState: idle() }),

	reset: () => set({ ...initialState }),
}));
