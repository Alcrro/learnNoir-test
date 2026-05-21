import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	lessonTheoryInteractionsApi,
	type TheoryInteractionComponentType,
	type TheoryInteractionDTO,
	type LessonContextForAI,
} from "../../../../features/lessons/api/lessonTheoryInteractionsApi";
import { useGuestProgressStore } from "../../../../features/lessons/store/useGuestProgressStore";

// ── Student hook: fetch only approved interactions ────────────────────────────

export function useApprovedTheoryInteractions(lessonId: string) {
	return useQuery({
		queryKey: ["theory-interactions", lessonId, "approved"],
		queryFn: () => lessonTheoryInteractionsApi.getApproved(lessonId),
		enabled: !!lessonId,
		staleTime: 5 * 60 * 1000,
	});
}

// ── Student hook: fetch approved interactions + record attempts ───────────────
// Designed for Theory V2 student view. Records engagement attempts so that
// quizScore in user_lesson_progress is computed by the backend from activity progress.
//
// Uses the /engage endpoint which works regardless of whether an approved interaction
// exists — it creates the lesson_activity lazily on first student engagement.

export function useStudentTheoryProgress(lessonId: string, isAuthenticated = true) {
	const qc = useQueryClient();

	// NOTE: ?? [] must be OUTSIDE the selector — if placed inside, Zustand creates a new []
	// reference on every call when the lessonId isn't in the store, causing an infinite loop.
	const guestEngaged =
		useGuestProgressStore((s) => s.lessons[lessonId]?.engagedComponents) ?? [];
	const guestEngage = useGuestProgressStore((s) => s.engage);

	const { data: interactions = [] } = useApprovedTheoryInteractions(lessonId);

	// My existing attempts for this lesson — used to display completion state.
	const { data: myAttempts = [] } = useQuery({
		queryKey: ["theory-interactions", lessonId, "my-attempts"],
		queryFn: () => lessonTheoryInteractionsApi.getMyAttempts(lessonId),
		enabled: !!lessonId && isAuthenticated,
		staleTime: 2 * 60 * 1000,
	});

	// In-session guard — avoids redundant network calls when the component re-renders.
	// Server-side upsert is idempotent (best-score semantics), so double-calls are harmless.
	const engagedInSession = useRef(new Set<TheoryInteractionComponentType>());

	const attemptedIds = isAuthenticated
		? new Set(myAttempts.map((a) => a.interactionId))
		: new Set(
				guestEngaged.flatMap((comp) => {
					const match = interactions.find((i) => i.componentType === comp);
					return match ? [match.id] : [];
				}),
			);

	const { mutate } = useMutation({
		mutationFn: (component: TheoryInteractionComponentType) =>
			lessonTheoryInteractionsApi.engage(lessonId, component),
		onSuccess: () => {
			void qc.invalidateQueries({ queryKey: ["my-lesson-progress"] });
		},
	});

	const interactionByComponent = (
		component: TheoryInteractionComponentType,
	): TheoryInteractionDTO | undefined =>
		interactions.find((i) => i.componentType === component);

	// Records engagement for a component.
	// No-op if already engaged in this session. Server handles permanent idempotency.
	const recordAttempt = (component: TheoryInteractionComponentType) => {
		if (!lessonId) return;
		if (engagedInSession.current.has(component)) return;
		engagedInSession.current.add(component);
		if (isAuthenticated) {
			mutate(component);
		} else {
			guestEngage(lessonId, component);
		}
	};

	return { interactionByComponent, recordAttempt, attemptedIds };
}

// ── Teacher hook: fetch all versions + generate + approve ─────────────────────

export function useTheoryInteractionsEditor(lessonId: string) {
	const qc = useQueryClient();
	const [generatingComponent, setGeneratingComponent] = useState<TheoryInteractionComponentType | null>(null);
	const [approvingId, setApprovingId] = useState<string | null>(null);

	const { data: interactions = [], isLoading } = useQuery({
		queryKey: ["theory-interactions", lessonId, "all"],
		queryFn: () => lessonTheoryInteractionsApi.getAll(lessonId),
		enabled: !!lessonId,
		staleTime: 0,
	});

	const { mutateAsync: generateMutation } = useMutation({
		mutationFn: ({
			component,
			lessonContext,
		}: {
			component: TheoryInteractionComponentType;
			lessonContext: LessonContextForAI;
		}) => lessonTheoryInteractionsApi.generate(lessonId, component, lessonContext),
		onSuccess: () => {
			void qc.invalidateQueries({ queryKey: ["theory-interactions", lessonId] });
		},
	});

	const { mutateAsync: approveMutation } = useMutation({
		mutationFn: (interactionId: string) =>
			lessonTheoryInteractionsApi.approve(lessonId, interactionId),
		onSuccess: () => {
			void qc.invalidateQueries({ queryKey: ["theory-interactions", lessonId] });
			// Also invalidate approved so student view updates
			void qc.invalidateQueries({ queryKey: ["theory-interactions", lessonId, "approved"] });
		},
	});

	const generate = async (component: TheoryInteractionComponentType, lessonContext: LessonContextForAI) => {
		setGeneratingComponent(component);
		try {
			await generateMutation({ component, lessonContext });
		} finally {
			setGeneratingComponent(null);
		}
	};

	const approve = async (interactionId: string) => {
		setApprovingId(interactionId);
		try {
			await approveMutation(interactionId);
		} finally {
			setApprovingId(null);
		}
	};

	// Latest interaction per component (newest version first)
	const latestByComponent = (component: TheoryInteractionComponentType): TheoryInteractionDTO | undefined => {
		return interactions
			.filter((i) => i.componentType === component)
			.sort((a, b) => b.version - a.version)[0];
	};

	return {
		interactions,
		isLoading,
		generatingComponent,
		approvingId,
		generate,
		approve,
		latestByComponent,
	};
}
