import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FeedbackVote } from "../features/lessons/api/lessonComponentFeedbackApi";

export type FeedbackEntry = {
	vote: FeedbackVote | null;
	upvotes: number;
	downvotes: number;
};

const DEFAULT_ENTRY: FeedbackEntry = { vote: null, upvotes: 0, downvotes: 0 };

type FeedbackStore = {
	entries: Record<string, FeedbackEntry>;
	getEntry: (key: string) => FeedbackEntry;
	setEntry: (key: string, entry: FeedbackEntry) => void;
};

export const useFeedbackStore = create<FeedbackStore>()(
	persist(
		(set, get) => ({
			entries: {},
			getEntry: (key) => get().entries[key] ?? DEFAULT_ENTRY,
			setEntry: (key, entry) =>
				set((s) => ({ entries: { ...s.entries, [key]: entry } })),
		}),
		{ name: "learnnoir-feedback" },
	),
);
