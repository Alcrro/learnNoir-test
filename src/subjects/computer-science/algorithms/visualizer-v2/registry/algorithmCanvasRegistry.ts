import type { ComponentType } from "react";
import type { AlgorithmTypes } from "../../shared/AlgorithmTypes";
import type { CanvasProps } from "../organisms/VisualizerCanvas";
import ArrayCanvas from "../organisms/canvas/ArrayCanvas";
import GraphCanvas from "../organisms/canvas/GraphCanvas";
import TreeCanvas from "../organisms/canvas/TreeCanvas";

export type CanvasType = "array" | "graph" | "tree";

export const algorithmCanvasRegistry: Record<AlgorithmTypes, CanvasType> = {
	"bubble-sort": "array",
	"insertion-sort": "array",
	"heap-sort": "tree",
	"quick-sort": "array",
	"binary-tree-sort": "tree",
};

export const CANVAS_COMPONENT_REGISTRY: Record<
	CanvasType,
	ComponentType<CanvasProps>
> = {
	array: ArrayCanvas,
	graph: GraphCanvas,
	tree: TreeCanvas,
};
