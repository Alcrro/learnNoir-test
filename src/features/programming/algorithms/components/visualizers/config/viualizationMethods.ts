import type {
	AlgorithmTypes,
	VisualizationMethod,
} from "../../../shared/AlgorithmTypes";

export const visualizationMethods: Record<
	AlgorithmTypes,
	VisualizationMethod[]
> = {
	"bubble-sort": ["box", "vertical", "pillar"],
	"insertion-sort": ["box", "vertical"],
	"heap-sort": ["tree"],
	"binary-tree": ["tree"],
} as const;
