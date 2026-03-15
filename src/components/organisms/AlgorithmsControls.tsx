import { useState, type FC, type RefObject } from "react";
import AlgStepsInfo from "../molecules/AlgStepsInfo";
import { startPlayback } from "../../features/programming/visualizer/engine/startPlayback";
import pausePlayback from "../../features/programming/visualizer/engine/pausePlayback";
import { useReset } from "../../features/programming/visualizer/hooks/useReset";
import useAutoPlaySteps from "../../features/programming/visualizer/engine/useAutoPlaySteps";
import StartButton from "../molecules/algorithmConrolersButtons/StartButton";
import ResetButton from "../molecules/algorithmConrolersButtons/ResetButton";
import PauseButton from "../molecules/algorithmConrolersButtons/PauseButton";
import PrevButton from "../molecules/algorithmConrolersButtons/PrevButton";
import NextButton from "../molecules/algorithmConrolersButtons/NextButton";

type Props = {
	currentStep: number;
	stepsLength: number;
	handleNextStep: () => void;
	handlePrevStep: () => void;

	setCurrentStep: (value: number) => void;
	boxesRef: RefObject<HTMLDivElement[]>;
};
const AlgorithmsControls: FC<Props> = ({
	currentStep,
	stepsLength,
	handleNextStep,
	handlePrevStep,
	setCurrentStep,
	boxesRef,
}) => {
	const [isPlaying, setIsPlaying] = useState(false);

	useAutoPlaySteps({
		isPlaying,
		currentStep,
		steps: stepsLength,
		handleNextStep,
	});
	const { play } = startPlayback({
		currentStep,
		setIsPlaying,
		stepNumbers: stepsLength,
	});

	//reset steps
	const { reset } = useReset(boxesRef, setCurrentStep);

	const { pause } = pausePlayback(setIsPlaying);
	return (
		<div className="mt-4 flex items-center w-full space-x-2 justify-between">
			<PrevButton
				currentStep={currentStep}
				handlePrevStep={handlePrevStep}
			/>
			<div className="flex flex-col gap-2">
				<div className="controls flex justify-center items-center gap-2">
					<StartButton playHandler={play} />
					<ResetButton resetHandler={reset} />
					<PauseButton pauseHandler={pause} />
				</div>
				<AlgStepsInfo
					currentStep={currentStep}
					steps={stepsLength}
					setCurrentStep={setCurrentStep}
				/>
			</div>
			<NextButton
				currentStep={currentStep}
				steps={stepsLength}
				handleNextStep={handleNextStep}
			/>
		</div>
	);
};

export default AlgorithmsControls;
