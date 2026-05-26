import { useReducer, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	lessonTheoryInteractionsApi,
	type TheoryInteractionComponentType,
} from "../../../../features/lessons/api/lessonTheoryInteractionsApi";
import { useGuestProgressStore } from "../../../../features/lessons/store/useGuestProgressStore";
import UseGetProfile from "../../../../features/profiles/hooks/UseGetProfile";
import { theoryQueryKeys } from "../lib/theoryQueryKeys";
import { lessonQueryKeys } from "../../../../features/lessons/lib/lessonQueryKeys";

const TOTAL_COMPONENTS = 8;

type State = {
	completed: Partial<Record<TheoryInteractionComponentType, boolean>>;
	quizScore: number;
	justCompleted: boolean;
};

type Action =
	| { type: "COMPLETE"; component: TheoryInteractionComponentType }
	| { type: "HYDRATE"; components: TheoryInteractionComponentType[] };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "COMPLETE": {
			if (state.completed[action.component]) return state;
			const next = { ...state.completed, [action.component]: true };
			const count = Object.values(next).filter(Boolean).length;
			return {
				completed: next,
				quizScore: Math.round((count / TOTAL_COMPONENTS) * 100),
				justCompleted: count === TOTAL_COMPONENTS,
			};
		}
		case "HYDRATE": {
			if (!action.components.length) return state;
			const completed = Object.fromEntries(
				action.components.map((c) => [c, true]),
			) as Partial<Record<TheoryInteractionComponentType, boolean>>;
			return {
				completed,
				quizScore: Math.round((action.components.length / TOTAL_COMPONENTS) * 100),
				justCompleted: false,
			};
		}
	}
}

const INITIAL: State = { completed: {}, quizScore: 0, justCompleted: false };

export function useTheoryProgressReducer(lessonId: string) {
	const qc = useQueryClient();
	const [state, dispatch] = useReducer(reducer, INITIAL);
	const hydrated = useRef(false);
	const sentToServer = useRef(new Set<TheoryInteractionComponentType>());

	const { isAuthenticated, isAuthLoading } = UseGetProfile();

	// Auth users: fetch which components they've already engaged with.
	const { data: serverProgress = [], isFetched: progressFetched } = useQuery({
		queryKey: theoryQueryKeys.myProgress(lessonId),
		queryFn: () => lessonTheoryInteractionsApi.getMyProgress(lessonId),
		enabled: !!lessonId && !isAuthLoading && isAuthenticated,
		staleTime: 2 * 60 * 1000,
	});

	// Guest store — synchronous.
	const guestEngaged =
		useGuestProgressStore((s) => s.lessons[lessonId]?.engagedComponents) ?? [];
	const guestEngage = useGuestProgressStore((s) => s.engage);

	// Hydrate once after auth resolves.
	useEffect(() => {
		if (hydrated.current || !lessonId || isAuthLoading) return;

		if (isAuthenticated) {
			if (!progressFetched) return;
			hydrated.current = true;

			serverProgress.forEach((c) => sentToServer.current.add(c));
			if (serverProgress.length) {
				dispatch({ type: "HYDRATE", components: serverProgress });
			}
		} else {
			hydrated.current = true;
			if (guestEngaged.length) {
				dispatch({ type: "HYDRATE", components: guestEngaged });
			}
		}
	}, [lessonId, isAuthLoading, isAuthenticated, progressFetched, serverProgress, guestEngaged]);

	const { mutate } = useMutation({
		mutationFn: (component: TheoryInteractionComponentType) =>
			lessonTheoryInteractionsApi.engage(lessonId, component),
		onSuccess: () => {
			void qc.invalidateQueries({ queryKey: lessonQueryKeys.myProgress });
		},
	});

	const recordComplete = (component: TheoryInteractionComponentType) => {
		if (!lessonId) return;

		dispatch({ type: "COMPLETE", component });

		if (isAuthenticated) {
			if (!sentToServer.current.has(component)) {
				sentToServer.current.add(component);
				mutate(component);
			}
		} else {
			guestEngage(lessonId, component);
		}
	};

	const completedCount = useMemo(
		() => Object.values(state.completed).filter(Boolean).length,
		[state.completed],
	);

	return {
		quizScore: state.quizScore,
		completedCount,
		totalComponents: TOTAL_COMPONENTS,
		justCompleted: state.justCompleted,
		recordComplete,
	};
}
