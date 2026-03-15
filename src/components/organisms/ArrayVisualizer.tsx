import { type FC, type RefObject } from "react";
import ArrayContainer from "../molecules/ArrayContainer";
import type { AlgorithmTypeProp } from "../../features/programming/algorithms/data/algorithmArray";
import { useVisualAlgorithmUIStore } from "../../store/useVisualAlgorithmUIStore";

type Props = {
	currentArray: AlgorithmTypeProp[];
	boxesRef: RefObject<HTMLDivElement[]>;
};
const ArrayVisualizer: FC<Props> = ({ currentArray, boxesRef }) => {
	const visualAlgorithm = useVisualAlgorithmUIStore(
		(store) => store.visualAlgorithmUI,
	);

	return (
		<div className="flex justify-center items-center min-h-60 border-b border-(--border-subtle) ">
			<div className="relative w-full min-h-full rounded-xl flex justify-center items-center gap-2 p-2 flex-wrap">
				{currentArray.map((num, index) => {
					return (
						<ArrayContainer
							key={num.id}
							ref={(el) => {
								if (el) boxesRef.current[index] = el;
							}}
							method={visualAlgorithm}
							value={num.value}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ArrayVisualizer;
