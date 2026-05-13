import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	lessonTheoryInteractionsApi,
	type TheoryInteractionComponentType,
	type TheoryInteractionDTO,
	type LessonContextForAI,
} from "../../../lessons/api/lessonTheoryInteractionsApi";

// ── Student hook: fetch only approved interactions ────────────────────────────

export function useApprovedTheoryInteractions(lessonId: string) {
	return useQuery({
		queryKey: ["theory-interactions", lessonId, "approved"],
		queryFn: () => lessonTheoryInteractionsApi.getApproved(lessonId),
		enabled: !!lessonId,
		staleTime: 5 * 60 * 1000,
	});
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
