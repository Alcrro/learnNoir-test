import type {
	AlgorithmTypes,
	ComplexityInfoProps,
} from "../shared/AlgorithmTypes";
import { bubbleSortComplexityInfo } from "./complexity";

export const algorithmComplexitiesRegistry: Record<
	AlgorithmTypes,
	ComplexityInfoProps
> = {
	"bubble-sort": bubbleSortComplexityInfo,
	"insertion-sort": bubbleSortComplexityInfo,
	"quick-sort": bubbleSortComplexityInfo,
	"heap-sort": bubbleSortComplexityInfo,
	"binary-tree-sort": bubbleSortComplexityInfo,
} as const;
