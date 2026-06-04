import { create } from "zustand";
import { lessonAIApi, type LessonReviewResult } from "../api/lessonAIApi";
import { useLessonEditStore } from "./useLessonEditStore";

type AIState<T> = { data: T | null; loading: boolean; error: string | null };
const idle = <T>(): AIState<T> => ({ data: null, loading: false, error: null });

type ReviewPayload = { title: string; description: string; content: string };

type LessonAIStore = {
	improveState: Record<string, AIState<string>>;
	reviewState: AIState<LessonReviewResult>;
	improveField: (fieldKey: string, text: string, context?: string) => Promise<string | null>;
	handleImproveTitle: (text: string, context?: string) => Promise<void>;
	handleImproveDescription: (text: string, context?: string) => Promise<void>;
	reviewLesson: (payload: ReviewPayload) => Promise<void>;
	handleReview: (payload: ReviewPayload) => void;
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
				improveState: {
					...s.improveState,
					[fieldKey]: { data: result, loading: false, error: null },
				},
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

	handleImproveTitle: async (text, context) => {
		const result = await get().improveField("title", text, context);
		if (result) {
			const truncated = result.length <= 150 ? result : result.slice(0, 150).replace(/\s+\S*$/, "");
			useLessonEditStore.getState().setEditTitle(truncated);
		}
	},

	handleImproveDescription: async (text, context) => {
		const result = await get().improveField("description", text, context);
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

	handleReview: (payload) => {
		void get().reviewLesson(payload);
	},

	clearReview: () => set({ reviewState: idle() }),

	reset: () => set({ ...initialState }),
}));
