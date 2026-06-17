import { create } from "zustand";
import type { StepV2 } from "../features/computer-science/algorithms/shared/AlgorithmTypesV2";

type AlgorithmStoreV2 = {
	stepsV2: StepV2[];
	setStepsV2: (steps: StepV2[]) => void;
};

export const useAlgorithmStoreV2 = create<AlgorithmStoreV2>((set) => ({
	stepsV2: [],
	setStepsV2: (steps) => set({ stepsV2: steps }),
}));
