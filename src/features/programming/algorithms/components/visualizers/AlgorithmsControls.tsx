import { useState, type FC, type RefObject } from "react";
import AlgorithmStepsInfo from "./controls/AlgorithmStepsInfo";
import { startPlayback } from "../../../visualizer/engine/startPlayback";
import pausePlayback from "../../../visualizer/engine/pausePlayback";
import { useReset } from "../../../visualizer/hooks/useReset";
import useAutoPlaySteps from "../../../visualizer/engine/useAutoPlaySteps";
import StartButton from "../../../../../components/molecules/algorithmControllerButtons/StartButton";
import ResetButton from "../../../../../components/molecules/algorithmControllerButtons/ResetButton";
import PauseButton from "../../../../../components/molecules/algorithmControllerButtons/PauseButton";
import PrevButton from "../../../../../components/molecules/algorithmControllerButtons/PrevButton";
import NextButton from "../../../../../components/molecules/algorithmControllerButtons/NextButton";

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
		<div
			className="p-2 flex items-center w-full space-x-2 justify-center bg-(--lp-bg-page) rounded-b-xl border border-t-0 border-(--border)"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="flex flex-col justify-center gap-2 p-2">
				<div className="controls flex justify-center items-center gap-2">
					<StartButton playHandler={play} />
					<ResetButton resetHandler={reset} />
					<PauseButton pauseHandler={pause} />
				</div>
				<div className="flex gap-2 items-center">
					<PrevButton
						currentStep={currentStep}
						handlePrevStep={handlePrevStep}
					/>
					<AlgorithmStepsInfo
						currentStep={currentStep}
						steps={stepsLength}
						setCurrentStep={setCurrentStep}
					/>
					<NextButton
						currentStep={currentStep}
						steps={stepsLength}
						handleNextStep={handleNextStep}
					/>
				</div>
			</div>
		</div>
	);
};

export default AlgorithmsControls;
