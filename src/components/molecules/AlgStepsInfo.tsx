type AlgStepsInfoProps = {
	currentStep: number;
	steps: number;
	setCurrentStep: (value: number) => void;
};
import type { ChangeEvent, FC } from "react";
import "../styles/stepsInfo.css";
import Input from "./Input";

const AlgStepsInfo: FC<AlgStepsInfoProps> = ({
	currentStep,
	steps,
	setCurrentStep,
}) => {
	const changeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);

		if (Number.isNaN(value)) return;

		const clamped = Math.min(Math.max(value, 0), steps);

		setCurrentStep(clamped - 1);
	};
	return (
		<div className="step-info border border-gray-600 p-2 rounded-2xl">
			<div className="step-text flex gap-2 justify-center items-center w-full">
				<span>Pas</span>
				<span>{currentStep}</span>
				<Input
					type="range"
					value={currentStep + 1}
					onChange={changeHandler}
					maxValue={steps}
					className="w-full "
				/>

				<span>din</span>
				<span>{steps}</span>
			</div>

			<div className="progress-bar">
				<div
					className="progress-fill"
					style={{
						width: `${((currentStep + 1) / steps) * 100}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default AlgStepsInfo;
