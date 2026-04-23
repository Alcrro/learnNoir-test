import type {
	AlgorithmTypes,
	VisualizationMethod,
} from "../../../shared/AlgorithmTypes";

export const visualizationMethods: Record<
	AlgorithmTypes,
	VisualizationMethod[]
> = {
	"bubble-sort": ["box", "vertical", "pillar", "bar"],
	"insertion-sort": ["box", "vertical"],
	"heap-sort": ["tree"],
	"quick-sort": ["bar"],
	"binary-tree-sort": ["tree"],
} as const;
