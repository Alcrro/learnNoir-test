import type { FC, RefObject } from "react";
import ArrayContainer from "../../../components/visualizers/shared/ArrayContainer";
import type { AlgorithmTypeProp } from "../../../data/algorithmArray";
import { useVisualAlgorithmUIStore } from "../../../../../../store/useVisualAlgorithmUIStore";

type Props = {
	currentArray: AlgorithmTypeProp[];
	boxesRef: RefObject<HTMLDivElement[]>;
};

const ArrayCanvas: FC<Props> = ({ currentArray, boxesRef }) => {
	const visualAlgorithm = useVisualAlgorithmUIStore(
		(s) => s.visualAlgorithmUI,
	);
	return (
		<div
			key={visualAlgorithm}
			className="relative w-full min-h-64 flex justify-center items-center gap-2 flex-wrap py-8 px-4"
		>
			{currentArray.map((num, index) => (
				<ArrayContainer
					key={num.id}
					ref={(el) => {
						if (el) boxesRef.current[index] = el;
					}}
					method={visualAlgorithm}
					value={num.value}
				/>
			))}
		</div>
	);
};

export default ArrayCanvas;
