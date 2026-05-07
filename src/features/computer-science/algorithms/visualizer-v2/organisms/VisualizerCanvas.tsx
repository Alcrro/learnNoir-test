import type { FC, RefObject } from "react";
import type { AlgorithmTypeProp } from "../../data/algorithmArray";
import { useCurrentAlgorithm } from "../hooks/useCurrentAlgorithm";
import {
	algorithmCanvasRegistry,
	CANVAS_COMPONENT_REGISTRY,
} from "../registry/algorithmCanvasRegistry";

export type CanvasProps = {
	currentArray: AlgorithmTypeProp[];
	boxesRef: RefObject<HTMLDivElement[]>;
};

const VisualizerCanvas: FC<CanvasProps> = (props) => {
	const algorithm = useCurrentAlgorithm();
	const canvasType = algorithm
		? (algorithmCanvasRegistry[algorithm] ?? "array")
		: "array";
	const Canvas = CANVAS_COMPONENT_REGISTRY[canvasType];
	return <Canvas {...props} />;
};

export default VisualizerCanvas;
