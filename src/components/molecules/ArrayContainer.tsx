import { forwardRef } from "react";
import { VISUALIZER_REGISTRY } from "../../features/programming/algorithms/components/visualizers/visualizerRegistry";

type Props = {
	method: string;
	value: number;
};

const ArrayContainer = forwardRef<HTMLDivElement, Props>(
	({ method, value }, ref) => {
		const Visualizer = VISUALIZER_REGISTRY[method];
		if (!Visualizer) return null;
		return (
			<Visualizer
				ref={ref}
				value={value}
			/>
		);
	},
);

export default ArrayContainer;
