import { type FC, type RefObject } from "react";
import ArrayContainer from "../../../../../components/molecules/ArrayContainer";
import type { AlgorithmTypeProp } from "../../data/algorithmArray";
import { useVisualAlgorithmUIStore } from "../../../../../store/useVisualAlgorithmUIStore";
import { ChevronDownSquare } from "lucide-react";
import PseudocodContainer from "../PseudocodContainer";
import { useToggleStore } from "../../../../../store/usetoggleStore";
import { cn } from "../../../../../libs/utils/cn";

type Props = {
	currentArray: AlgorithmTypeProp[];
	boxesRef: RefObject<HTMLDivElement[]>;
};
const ArrayVisualizer: FC<Props> = ({ currentArray, boxesRef }) => {
	const setToggle = useToggleStore((store) => store.setToggle);
	const isToggled = useToggleStore((store) => store.isToggled);
	const visualAlgorithm = useVisualAlgorithmUIStore(
		(store) => store.visualAlgorithmUI,
	);

	return (
		<div className="flex flex-col justify-between py-2 items-center min-h-80 h-full border border-(--border-color) rounded-2xl bg-(--bg-card)">
			<div className="toolbox absolute right-0 pr-4 lg:hidden z-20 min-w-fit w-28">
				<div className="flex flex-col pr-4 gap-2">
					<div
						className="dropdownButton ml-auto cursor-pointer "
						onClick={() => setToggle("openToolboxViualArray")}
					>
						<ChevronDownSquare size={22} />
					</div>
					<div
						className={cn(
							"list right-3 bg-(--bg-tertiary) p-2 rounded-md",
							isToggled("openToolboxViualArray") ? "hidden" : "",
						)}
					>
						<ul className="flex flex-col gap-2 text-center">
							<li>Pseudocode</li>
							<li>Pseudocode 1</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="absolute z-20 bg-(--bg-color) p-4">
				<div className="max-h-40">aici e pseudocodu</div>
				{/* <PseudocodContainer /> */}
			</div>
			<div
				key={visualAlgorithm}
				className="relative w-full min-h-100 rounded-xl flex justify-center items-center gap-2 flex-wrap h-full"
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
