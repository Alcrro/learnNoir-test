import { useState, type ChangeEvent, type FC, type RefObject } from "react";
import {
	Play,
	Pause,
	RotateCcw,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { startPlayback } from "../../../visualizer/engine/startPlayback";
import pausePlayback from "../../../visualizer/engine/pausePlayback";
import { useReset } from "../../../visualizer/hooks/useReset";
import useAutoPlaySteps from "../../../visualizer/engine/useAutoPlaySteps";

type Props = {
	currentStep: number;
	stepsLength: number;
	handleNextStep: () => void;
	handlePrevStep: () => void;
	setCurrentStep: (value: number) => void;
	boxesRef: RefObject<HTMLDivElement[]>;
};

const ControlBtn = ({
	onClick,
	disabled,
	title,
	active,
	children,
}: {
	onClick?: () => void;
	disabled?: boolean;
	title?: string;
	active?: boolean;
	children: React.ReactNode;
}) => (
	<button
		onClick={onClick}
		disabled={disabled}
		title={title}
		className={cn(
			"flex items-center justify-center w-7 h-7 rounded-md transition-all duration-100 outline-none",
			"text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-tertiary)",
			"disabled:opacity-30 disabled:pointer-events-none",
			active && "text-(--text-primary) bg-(--bg-tertiary)",
		)}
	>
		{children}
	</button>
);

const AlgorithmsControlsV2: FC<Props> = ({
	currentStep,
	stepsLength,
	handleNextStep,
	handlePrevStep,
	setCurrentStep,
	boxesRef,
}) => {
	const [isPlaying, setIsPlaying] = useState(false);

	useAutoPlaySteps({ isPlaying, currentStep, steps: stepsLength, handleNextStep });

	const { play } = startPlayback({ currentStep, setIsPlaying, stepNumbers: stepsLength });
	const { pause } = pausePlayback(setIsPlaying);
	const { reset } = useReset(boxesRef, setCurrentStep);

	const atStart = currentStep < 0;
	const atEnd = currentStep + 1 === stepsLength;
	const progress = stepsLength > 0 ? ((currentStep + 1) / stepsLength) * 100 : 0;

	const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		if (!Number.isNaN(value)) setCurrentStep(Math.min(Math.max(value - 1, -1), stepsLength - 1));
	};

	return (
		<div
			className="flex items-center gap-2 px-4 py-2.5 border-t border-(--border) bg-(--bg-page)"
			onClick={(e) => e.stopPropagation()}
		>
			{/* Playback */}
			<div className="flex items-center gap-0.5">
				{isPlaying ? (
					<ControlBtn onClick={pause} title="Pause">
						<Pause size={13} strokeWidth={2} />
					</ControlBtn>
				) : (
					<ControlBtn onClick={play} title="Play" disabled={atEnd}>
						<Play size={13} strokeWidth={2} />
					</ControlBtn>
				)}
				<ControlBtn onClick={reset} title="Reset">
					<RotateCcw size={13} strokeWidth={2} />
				</ControlBtn>
			</div>

			{/* Divider */}
			<div className="w-px h-4 bg-(--border) shrink-0" />

			{/* Step prev */}
			<ControlBtn
				onClick={handlePrevStep}
				disabled={atStart}
				title="Previous step"
			>
				<ChevronLeft size={14} strokeWidth={2} />
			</ControlBtn>

			{/* Slider */}
			<input
				type="range"
				min={1}
				max={stepsLength || 1}
				value={currentStep + 1}
				onChange={handleSliderChange}
				className="flex-1 h-1 appearance-none rounded-full cursor-pointer
					bg-(--border)
					[&::-webkit-slider-thumb]:appearance-none
					[&::-webkit-slider-thumb]:w-2.5
					[&::-webkit-slider-thumb]:h-2.5
					[&::-webkit-slider-thumb]:rounded-full
					[&::-webkit-slider-thumb]:bg-(--default_color)
					[&::-webkit-slider-thumb]:cursor-pointer
					[&::-webkit-slider-thumb]:transition-transform
					[&::-webkit-slider-thumb]:duration-100
					[&::-webkit-slider-thumb:hover]:scale-125"
				style={{
					background: `linear-gradient(to right, var(--default_color) ${progress}%, var(--border) ${progress}%)`,
				}}
			/>

			{/* Step next */}
			<ControlBtn
				onClick={handleNextStep}
				disabled={atEnd}
				title="Next step"
			>
				<ChevronRight size={14} strokeWidth={2} />
			</ControlBtn>

			{/* Step counter */}
			<span className="text-xs font-mono tabular-nums text-(--text-muted) shrink-0 min-w-[3.5rem] text-right">
				{atStart ? "— / —" : `${currentStep + 1} / ${stepsLength}`}
			</span>
		</div>
	);
};

export default AlgorithmsControlsV2;
