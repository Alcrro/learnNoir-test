import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AlgorithmTypeProp } from "../features/programming/algorithms/data/algorithmArray";
import { generateArray } from "../libs/utils/generateArray";
import type { Step } from "../features/programming/algorithms/shared/AlgorithmTypes";

type AlgorithmStore = {
	currentStep: number | -1;
	steps: Step[];
	generatedArray: AlgorithmTypeProp[];

	time: number;
	setTime: (time: number) => void;

	setCurrentStep: (step: number) => void;
	setSteps: (steps: Step[]) => void;
	setGeneratedArray: (arr: AlgorithmTypeProp[]) => void;
};
export const useAlgorithmStore = create<AlgorithmStore>()(
	persist(
		(set) => ({
			currentStep: -1,
			steps: [],
			generatedArray: generateArray(10, 1, 100),

			time: -1,
			setTime: (time) => set({ time }),

			setCurrentStep: (step) => set({ currentStep: step }),
			setSteps: (steps) =>
				set((state) => {
					if (state.steps === steps) return state;
					return { steps };
				}),
			setGeneratedArray: (arr) => set({ generatedArray: arr }),
		}),
		{ name: "algorithm-storage" },
	),
);
