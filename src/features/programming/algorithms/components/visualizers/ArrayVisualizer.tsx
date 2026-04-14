import { type FC, type RefObject } from "react";
import ArrayContainer from "./shared/ArrayContainer";
import type { AlgorithmTypeProp } from "../../data/algorithmArray";
import { useVisualAlgorithmUIStore } from "../../../../../store/useVisualAlgorithmUIStore";

type Props = {
	currentArray: AlgorithmTypeProp[];
	boxesRef: RefObject<HTMLDivElement[]>;
};
const ArrayVisualizer: FC<Props> = ({ currentArray, boxesRef }) => {
	const visualAlgorithm = useVisualAlgorithmUIStore(
		(store) => store.visualAlgorithmUI,
	);

	return (
		<div className="flex flex-col justify-between py-2 pt-18 items-center min-h-60 h-full rounded-t-xl bg-(--lp-bg-page) border border-(--border)">
			<div
				key={visualAlgorithm}
				className="relative w-full min-h-60 rounded-xl flex justify-center items-center gap-2 flex-wrap h-full"
			>
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
