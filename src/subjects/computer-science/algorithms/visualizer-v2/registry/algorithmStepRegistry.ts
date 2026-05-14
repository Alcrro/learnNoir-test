import { generateBubbleSortSteps } from "../../bubble-sort/domain/bubbleSort";
import type { AlgorithmTypes, Step } from "../../shared/AlgorithmTypes";
import type { AlgorithmTypeProp } from "../../data/algorithmArray";

type StepGenerator = (arr: AlgorithmTypeProp[]) => Step[];

export const algorithmStepRegistry: Partial<Record<AlgorithmTypes, StepGenerator>> = {
	"bubble-sort": generateBubbleSortSteps,
};
