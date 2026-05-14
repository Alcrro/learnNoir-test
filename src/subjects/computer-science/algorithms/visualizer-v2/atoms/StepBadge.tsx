import type { FC } from "react";
import { cn } from "../../../../../libs/utils/cn";

type Props = {
	currentStep: number;
	totalSteps: number;
	className?: string;
};

const StepBadge: FC<Props> = ({ currentStep, totalSteps, className }) => {
	const display =
		currentStep < 0 ? "— / —" : `${currentStep + 1} / ${totalSteps}`;
	return (
		<span
			className={cn(
				"text-xs font-mono tabular-nums text-(--text-secondary)",
				className,
			)}
		>
			Step {display}
		</span>
	);
};

export default StepBadge;
