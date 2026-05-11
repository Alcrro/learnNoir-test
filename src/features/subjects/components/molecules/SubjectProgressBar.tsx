import React from "react";

type SubjectProgressBarProps = {
	progress: number;
	accent: {
		progress: string;
	};
	className?: string;
	barClassName?: string;
	ariaLabel?: string;
};
const ProgressBar = ({
	progress,

	accent,
	className,
	barClassName,
	ariaLabel,
}: SubjectProgressBarProps) => {
	return (
		<div
			className={`h-2 overflow-hidden rounded-full bg-(--bg-secondary) ${className}`}
			role="progressbar"
			aria-valuenow={progress}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={ariaLabel}
		>
			<div
				className={`h-full rounded-full transition-all duration-500 ${accent.progress} ${barClassName}`}
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
