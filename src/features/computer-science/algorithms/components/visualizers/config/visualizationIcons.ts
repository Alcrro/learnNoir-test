import {
	SquareIcon,
	BarChart2Icon,
	ChartColumn,
	GitBranchIcon,
	type LucideIcon,
	BarChart3,
} from "lucide-react";
import type { VisualizationMethod } from "../../../shared/AlgorithmTypes";

export const visualizationIcons: Record<VisualizationMethod, LucideIcon> = {
	box: SquareIcon,
	bar: BarChart3,
	vertical: BarChart2Icon,
	pillar: ChartColumn,
	tree: GitBranchIcon,
};
