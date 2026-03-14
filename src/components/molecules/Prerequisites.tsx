import { type FC } from "react";

import { useToggleStore } from "../../store/usetoggleStore";
import { useLectureStore } from "../../store/useLectureStore";
import type { PrerequisiteProp } from "../../features/programming/algorithms/bubble-sort/docs/bubbleSortDocs";

type Props = {
	prerequisites: PrerequisiteProp[];
};
const Prerequisites: FC<Props> = ({ prerequisites }) => {
	const { openLecture } = useLectureStore((store) => store);
	const active = useToggleStore((s) => s.toggle.has("sideBar"));
	const openDiv = useToggleStore((s) => s.openToggle);
	return (
		<div className="step-prereq">
			<span>Ai nevoie să știi:</span>
			<ul
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{prerequisites.map((pre) => (
					<li key={pre.id}>
						<div
							onClick={() => {
								if (!active) {
									openDiv("sideBar");
								}
								openLecture(pre.prereqId);
							}}
							className="cursor-pointer"
						>
							{pre.value}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Prerequisites;
