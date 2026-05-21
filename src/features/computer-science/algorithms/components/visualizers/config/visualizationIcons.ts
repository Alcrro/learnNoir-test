import {
	LayoutGrid,
	BarChart3,
	AlignCenter,
	Columns3,
	Network,
	type LucideIcon,
} from "lucide-react";
import type { VisualizationMethod } from "../../../shared/AlgorithmTypes";

export const visualizationIcons: Record<VisualizationMethod, LucideIcon> = {
	box: LayoutGrid,
	bar: BarChart3,
	vertical: AlignCenter,
	pillar: Columns3,
	tree: Network,
};
