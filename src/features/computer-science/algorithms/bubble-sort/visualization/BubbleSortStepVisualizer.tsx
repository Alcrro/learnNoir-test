import { useBubbleSortStepPlayer } from "./hooks/useBubbleSortStepPlayer";
import { buildDescription } from "./lib/bubbleSortStepUtils";
import { StepHeader } from "./molecules/StepHeader";
import { BubbleSortCanvas } from "./molecules/BubbleSortCanvas";
import { StepDescription } from "./molecules/StepDescription";
import { StepControls } from "./molecules/StepControls";
import "./bubbleSortStep.css";

export function BubbleSortStepVisualizer() {
	const {
		step,
		currentFrame,
		totalFrames,
		sortedSet,
		swapEmptyIdx,
		tempValue,
		isPlaying,
		handleReset,
		handlePrev,
		handlePlayPause,
		handleNext,
		handleShuffle,
	} = useBubbleSortStepPlayer();

	if (!step) return null;

	return (
		<div className="flex flex-col gap-4">
			<StepHeader step={step} currentFrame={currentFrame} totalFrames={totalFrames} />
			<BubbleSortCanvas
				step={step}
				sortedSet={sortedSet}
				swapEmptyIdx={swapEmptyIdx}
				tempValue={tempValue}
			/>
			<StepDescription text={buildDescription(step)} />
			<StepControls
				currentFrame={currentFrame}
				totalFrames={totalFrames}
				isPlaying={isPlaying}
				onReset={handleReset}
				onPrev={handlePrev}
				onPlayPause={handlePlayPause}
				onNext={handleNext}
				onShuffle={handleShuffle}
			/>
		</div>
	);
}
