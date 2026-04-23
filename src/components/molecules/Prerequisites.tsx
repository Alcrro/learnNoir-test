import { type FC } from "react";

import { useToggleStore } from "../../store/useToggleStore";
import { useLectureStore } from "../../store/useLectureStore";
import type { PrerequisiteProp } from "../../features/computer-science/algorithms/bubble-sort/docs/bubbleSortDocs";
import { useAlgorithmStore } from "../../store/useAlgorithmStore";

type Props = {
	prerequisites: PrerequisiteProp[];
};
const Prerequisites: FC<Props> = ({ prerequisites }) => {
	const addLecture = useLectureStore((store) => store.addLecture);

	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const setToggled = useToggleStore((store) => store.setToggle);
	// const active = useToggleStore((s) => s.toggle.has("sideBar"));
	// const openDiv = useToggleStore((s) => s.openToggle);
	const toggle = useToggleStore((s) => s.openToggle);

	return (
		<div
			className="step-prereq"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<span>Ai nevoie să știi:</span>
			<ul>
				{prerequisites.map((pre) => (
					<li key={pre.id}>
						<div
							onClick={() => {
								toggle("sideBar");

								setToggled(pre.prereqId);
								// setToggled(pre.prereqId);
								addLecture(pre.prereqId, currentStep);
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
