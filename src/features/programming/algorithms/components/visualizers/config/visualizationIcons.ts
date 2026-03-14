import {
	SquareIcon,
	BarChart2Icon,
	ChartColumn,
	GitBranchIcon,
	type LucideIcon,
} from "lucide-react";
import type { VisualizationMethod } from "../../../shared/AlgorithmTypes";

export const visualizationIcons: Record<VisualizationMethod, LucideIcon> = {
	box: SquareIcon,
	vertical: BarChart2Icon,
	pillar: ChartColumn,
	tree: GitBranchIcon,
};
