import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../libs/utils/cn";
import { useToggleStore } from "../../store/usetoggleStore";
import ToolbarIcon from "./ToolbarIcon";
import { useAlgorithmStore } from "../../store/useAlgorithmStore";
import { useLectureStore } from "../../store/useLectureStore";

const LearnContainer = ({
	children,
	containerName,
}: {
	children: ReactNode;
	containerName: string;
}) => {
	const [pulse, setPulse] = useState(false);
	const [highlight, setHighlight] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);
	const activeLecture = useLectureStore((store) => store.lectures);
	const isToggledCheck = useToggleStore((store) => store.isToggled);
	const setToggle = useToggleStore((store) => store.setToggle);
	const currentStep = useAlgorithmStore((store) => store.currentStep);

	const isToggled = isToggledCheck(containerName);

	useEffect(() => {
		if (!isToggled) return;

		if (currentStep < 0) return;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setPulse(true);

		const t = setTimeout(() => setPulse(false), 3000);

		return () => clearTimeout(t);
	}, [currentStep, isToggled]);

	useEffect(() => {
		const el = divRef.current;
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setHighlight(true);
		const t = setTimeout(() => setHighlight(false), 1600);

		return () => clearTimeout(t);
	}, [activeLecture, containerName]);
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			ref={divRef}
		>
			<div
				className={cn(
					"rounded-md overflow-hidden transition-all duration-500 ease-in-out border border-transparent",
					isToggled ? "max-h-0 opacity-0" : "max-h-125 opacity-100",
					highlight && "border border-(--accent) animate-pulse bg-(--accent)/10",
				)}
			>
				{children}
			</div>
			<ToolbarIcon
				title={containerName}
				handleClick={() => setToggle(containerName)}
				classname={cn(
					"peer transition-all",
					!isToggled && "relative",
					pulse && isToggled && "animate-pulse scale-110 bg-amber-300",
				)}
			/>
		</div>
	);
};

export default LearnContainer;
