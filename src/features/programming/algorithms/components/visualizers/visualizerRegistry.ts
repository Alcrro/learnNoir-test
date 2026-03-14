import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { BoxAlgorithmVisualization } from "./array/BoxVisualizer";
import { PillarAlgorithmVisualization } from "./array/PillarVisualizer";
import { VerticalAlgorithmVisualization } from "./array/VerticalBarVisualizer";
type VisualizerProps = {
	value: number;
};
export type VisualizerComponent = ForwardRefExoticComponent<
	VisualizerProps & RefAttributes<HTMLDivElement>
>;

export const VISUALIZER_REGISTRY: Record<string, VisualizerComponent> = {
	box: BoxAlgorithmVisualization,
	vertical: VerticalAlgorithmVisualization,
	pillar: PillarAlgorithmVisualization,
};

export type VisualzerMethod = keyof typeof VISUALIZER_REGISTRY;
