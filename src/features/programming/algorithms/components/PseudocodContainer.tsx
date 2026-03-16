import { useToggleStore } from "../../../../store/usetoggleStore";
import { cn } from "../../../../libs/utils/cn";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { bubblePseudo } from "../data/pseudocode";
import LearnContainer from "../../../../components/molecules/LearnContainer";

const PseudocodContainer = () => {
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

	return (
		<LearnContainer containerName="pseudocode_container">
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
		</LearnContainer>
	);
};

export default PseudocodContainer;
