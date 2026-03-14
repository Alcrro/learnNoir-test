import {
	ArrowLeftCircle,
	PlayCircle,
	ArrowRightCircle,
	RotateCcw,
	PauseCircle,
} from "lucide-react";
import type { FC } from "react";
import DefaultButton from "../atoms/DefaultButton";
import AlgStepsInfo from "../molecules/AlgStepsInfo";

type Props = {
	currentStep: number;
	stepsLength: number;
	handleNextStep: () => void;
	handlePrevStep: () => void;
	reset: () => void;
	setCurrentStep: (value: number) => void;
	start: () => void;
	pause: () => void;
};
const AlgorithmsControls: FC<Props> = ({
	currentStep,
	stepsLength,
	handleNextStep,
	handlePrevStep,
	reset,
	setCurrentStep,
	start,
	pause,
}) => {
	return (
		<div className="mt-4 flex items-center w-full space-x-2 justify-between">
			<DefaultButton
				variant={currentStep < 0 ? "ghost" : "icon"}
				size="icon"
				onClick={handlePrevStep}
			>
				<ArrowLeftCircle className="size-8" />
			</DefaultButton>
			<div className="flex flex-col gap-2">
				<div className="controls flex justify-center items-center gap-2">
					<DefaultButton
						variant="primary"
						className="size-12 rounded-2xl"
						size="icon"
						onClick={start}
					>
						<PlayCircle className="size-8" />
					</DefaultButton>
					<DefaultButton
						variant="destructive"
						className="p-2 bg-red-500 text-white rounded-2xl h-fit"
						onClick={reset}
					>
						<RotateCcw className="size-8" />
					</DefaultButton>
					<DefaultButton
						variant="destructive"
						className="p-2 bg-gray-500 text-white rounded-2xl h-fit"
						onClick={pause}
					>
						<PauseCircle className="size-8" />
					</DefaultButton>
				</div>
				<AlgStepsInfo
					currentStep={currentStep}
					steps={stepsLength}
					setCurrentStep={setCurrentStep}
				/>
			</div>
			<DefaultButton
				variant={currentStep + 1 === stepsLength ? "ghost" : "icon"}
				size="icon"
				onClick={handleNextStep}
				disabled={currentStep + 1 === stepsLength}
			>
				<ArrowRightCircle className="size-8" />
			</DefaultButton>
		</div>
	);
};

export default AlgorithmsControls;
