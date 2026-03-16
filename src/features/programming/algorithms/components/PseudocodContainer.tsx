import { useToggleStore } from "../../../../store/usetoggleStore";
import { cn } from "../../../../libs/utils/cn";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { bubblePseudo } from "../data/pseudocode";
import ToolbarIcon from "../../../../components/molecules/ToolbarIcon";
import { useEffect, useState } from "react";

const PseudocodContainer = () => {
	const [pulse, setPulse] = useState(false);
	const setToggle = useToggleStore((store) => store.setToggle);
	const isToggled = useToggleStore((store) => store.isToggled);
	const steps = useAlgorithmStore((store) => store.steps);
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const step = currentStep !== null ? steps[currentStep] : null;
	const activeLines =
		step?.line === undefined
			? []
			: Array.isArray(step.line)
				? step.line
				: [step.line];

	useEffect(() => {
		if (!isToggled("pseudocode_container")) return;

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
					"bg-(--bg-secondary) rounded-md overflow-hidden transition-all duration-500 ease-in-out",
					isToggled("pseudocode_container")
						? "max-h-0 opacity-0"
						: "max-h-125 opacity-100",
				)}
			>
				<div className="py-2">Pseudocode</div>

				<div className="rounded-md p-4 font-mono text-sm">
					{bubblePseudo.map((line, index) => {
						const isActive = activeLines.includes(index);

						return (
							<div
								key={index}
								style={{
									paddingLeft: line.indent * 16,
									transitionDelay: `${index * 40}ms`,
								}}
								className={cn(
									"flex gap-4 py-1 transition-all duration-300 text-(--text-muted)",
									isToggled("pseudocode_container")
										? "opacity-0 -translate-y-2"
										: "opacity-100 translate-y-0",
									isActive && "text-(--text-primary) border-l-2 border-(--subtle)",
								)}
							>
								<span className={cn("text-gray-400 w-6 text-right select-none")}>
									{index + 1}
								</span>

								<span
									className={cn(
										isActive && "bg-(--color-primary-hover) text-white px-1 rounded-md",
									)}
								>
									{line.text}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<ToolbarIcon
				title={"Pseudocod container"}
				handleClick={() => setToggle("pseudocode_container")}
				classname={cn(
					"peer transition-all",
					!isToggled("pseudocode_container") && "relative",
					pulse && "animate-pulse scale-110 bg-amber-300",
				)}
			/>
		</div>
	);
};

export default PseudocodContainer;
