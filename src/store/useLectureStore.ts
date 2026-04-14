import { create } from "zustand";
import type { LectureType } from "../features/programming/algorithms/bubble-sort/docs/compareElements";

type LectureStore = {
	activeStep: number | null;
	lectures: LectureType[];
	addLecture: (lecture: LectureType, step: number) => void;
	clearAll: () => void;
};
export const useLectureStore = create<LectureStore>()((set) => ({
	activeStep: null,
	lectures: [],
	addLecture(activeLectureId, step) {
		set((state) => {
			const isNewStep = state.activeStep !== step;
			if (isNewStep) return { activeStep: step, lectures: [activeLectureId] };

			if (state.lectures.includes(activeLectureId)) return state;
			return {
				...state,
				lectures: [...state.lectures, activeLectureId],
			};
		});
	},

	clearAll() {
		set(() => ({ lectures: [], activeStep: null }));
	},
}));
