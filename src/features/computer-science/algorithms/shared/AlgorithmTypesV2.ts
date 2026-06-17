import type { Step } from "./AlgorithmTypes";

export type BubbleSortVars = {
	i: number;
	j: number;
	swapped: boolean;
	leftVal: number | null;
	rightVal: number | null;
};

export type StepV2 = Step & {
	vars: BubbleSortVars;
};
