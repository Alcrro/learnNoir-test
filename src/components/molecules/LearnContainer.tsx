import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../libs/utils/cn";
import { useToggleStore } from "../../store/usetoggleStore";
import ToolbarIcon from "./ToolbarIcon";
import { useAlgorithmStore } from "../../store/useAlgorithmStore";

const LearnContainer = ({
	children,
	containerName,
}: {
	children: ReactNode;
	containerName: string;
}) => {
	const [pulse, setPulse] = useState(false);
	const isToggled = useToggleStore((store) => store.isToggled(containerName));
	const setToggle = useToggleStore((store) => store.setToggle);
	const currentStep = useAlgorithmStore((store) => store.currentStep);

	useEffect(() => {
		if (!isToggled) return;

		if (currentStep < 0) return;
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setPulse(true);

		const t = setTimeout(() => setPulse(false), 3000);

		return () => clearTimeout(t);
	}, [currentStep, isToggled]);
	return (
		<div onClick={(e) => e.stopPropagation()}>
			<div
				className={cn(
					"bg-(--bg-card) rounded-md overflow-hidden transition-all duration-500 ease-in-out",
					isToggled ? "max-h-0 opacity-0" : "max-h-125 opacity-100",
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
					pulse && "animate-pulse scale-110 bg-amber-300",
				)}
			/>
		</div>
	);
};

export default LearnContainer;
