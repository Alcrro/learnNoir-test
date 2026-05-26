import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFeedbackStore } from "../../../../store/useFeedbackStore";
import { lessonComponentFeedbackApi } from "../../../../features/lessons/api/lessonComponentFeedbackApi";
import type { FeedbackVote, FeedbackCounts } from "../../../../features/lessons/api/lessonComponentFeedbackApi";
import { theoryQueryKeys } from "../lib/theoryQueryKeys";

function storeKey(lessonId: string, componentId: string) {
	return `${lessonId}:${componentId}`;
}

function applyVote(prev: FeedbackCounts, vote: FeedbackVote): FeedbackCounts {
	const isToggle = prev.myVote === vote;
	return {
		myVote: isToggle ? null : vote,
		upvotes:
			vote === "up"
				? isToggle
					? Math.max(0, prev.upvotes - 1)
					: prev.upvotes + 1
				: prev.myVote === "up"
					? Math.max(0, prev.upvotes - 1)
					: prev.upvotes,
		downvotes:
			vote === "down"
				? isToggle
					? Math.max(0, prev.downvotes - 1)
					: prev.downvotes + 1
				: prev.myVote === "down"
					? Math.max(0, prev.downvotes - 1)
					: prev.downvotes,
	};
}

export function useComponentFeedback(lessonId: string, componentId: string) {
	const qc = useQueryClient();
	const sk = storeKey(lessonId, componentId);
	const getEntry = useFeedbackStore((s) => s.getEntry);
	const setEntry = useFeedbackStore((s) => s.setEntry);

	// Fetch from DB — retry: false to avoid spamming 404s when componentId has no DB record yet
	const { data: serverData } = useQuery({
		queryKey: theoryQueryKeys.feedback(lessonId, componentId),
		queryFn: () => lessonComponentFeedbackApi.getCounts(lessonId, componentId),
		enabled: !!lessonId,
		staleTime: 60_000,
		retry: false,
	});

	// Sync server data into Zustand store (persists to localStorage)
	useEffect(() => {
		if (serverData) {
			setEntry(sk, { vote: serverData.myVote, upvotes: serverData.upvotes, downvotes: serverData.downvotes });
		}
	}, [serverData, sk, setEntry]);

	// Show server data when available; fall back to store (works offline / before first fetch)
	const stored = getEntry(sk);
	const current: FeedbackCounts = serverData ?? {
		myVote: stored.vote,
		upvotes: stored.upvotes,
		downvotes: stored.downvotes,
	};

	const upsertMutation = useMutation({
		mutationFn: ({ vote, message, selectedOptionIds }: { vote: FeedbackVote; message?: string; selectedOptionIds?: string[] }) =>
			lessonComponentFeedbackApi.upsert(lessonId, componentId, vote, message, selectedOptionIds),
		onMutate: async ({ vote }) => {
			await qc.cancelQueries({ queryKey: theoryQueryKeys.feedback(lessonId, componentId) });
			const prev = getEntry(sk);
			const next = applyVote({ myVote: prev.vote, upvotes: prev.upvotes, downvotes: prev.downvotes }, vote);
			setEntry(sk, { vote: next.myVote, upvotes: next.upvotes, downvotes: next.downvotes });
			return { prev };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.prev) setEntry(sk, ctx.prev);
		},
		onSettled: () => {
			void qc.invalidateQueries({ queryKey: theoryQueryKeys.feedback(lessonId, componentId) });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: () => lessonComponentFeedbackApi.remove(lessonId, componentId),
		onMutate: async () => {
			await qc.cancelQueries({ queryKey: theoryQueryKeys.feedback(lessonId, componentId) });
			const prev = getEntry(sk);
			setEntry(sk, {
				vote: null,
				upvotes: prev.vote === "up" ? Math.max(0, prev.upvotes - 1) : prev.upvotes,
				downvotes: prev.vote === "down" ? Math.max(0, prev.downvotes - 1) : prev.downvotes,
			});
			return { prev };
		},
		onError: (_err, _vars, ctx) => {
			if (ctx?.prev) setEntry(sk, ctx.prev);
		},
		onSettled: () => {
			void qc.invalidateQueries({ queryKey: theoryQueryKeys.feedback(lessonId, componentId) });
		},
	});

	const handleVote = (vote: FeedbackVote) => {
		if (current.myVote === vote) {
			deleteMutation.mutate();
		} else {
			upsertMutation.mutate({ vote });
		}
	};

	const sendMessage = (message: string, selectedOptionIds?: string[]) => {
		if (!current.myVote) return;
		upsertMutation.mutate({ vote: current.myVote, message, selectedOptionIds });
	};

	return { ...current, handleVote, sendMessage };
}
