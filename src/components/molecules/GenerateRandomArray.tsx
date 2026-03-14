import { useState, type Dispatch, type SetStateAction } from "react";
import DefaultButton from "../atoms/DefaultButton";
import Input from "./Input";
import { useAlgorithmStore } from "../../store/useAlgorithmStore";
import { generateArray } from "../../libs/utils/generateArray";

type GenerateRandomArrayProps = {
	size?: number;
	setSize?: Dispatch<SetStateAction<number>>;
	minValue?: number;
	maxValue?: number;
	setMinValueState?: Dispatch<SetStateAction<number>>;
	setMaxValueState?: Dispatch<SetStateAction<number>>;
	setCurrentStep: (value: number) => void;
	reset: () => void;
};
const GenerateRandomArray = ({
	size = 10,
	setSize,
	setCurrentStep,
	reset,
}: GenerateRandomArrayProps) => {
	const setGeneratedArray = useAlgorithmStore(
		(store) => store.setGeneratedArray,
	);
	const [error, setError] = useState("");

	const onGenerate = () => {
		if (size < 3 || size > 30) {
			setError("size cannot be less than 3 and grater then 30");
			return;
		}
		setCurrentStep(-1);
		reset();
		setGeneratedArray(generateArray(size, -99, 99));
	};

	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.currentTarget.value;

		if (raw === "") {
			setSize?.(0);
			return;
		}

		const value = Number(raw);

		if (Number.isNaN(value)) return;

		if (value < 3) {
			setError("Size must be grater than 3");
		} else if (value > 30) {
			setError("Size must be max 30");
		} else {
			setError("");
		}

		setSize?.(value);
	};

	return (
		<div className="flex  gap-2 items-center">
			<DefaultButton
				variant="primary"
				onClick={onGenerate}
				className="rounded-xl"
			>
				Generate random array
			</DefaultButton>
			<div className="flex items-center gap-2 relative">
				<div>Size array:</div>
				<Input
					value={size}
					minValue={3}
					maxValue={30}
					onChange={handleSizeChange}
				/>
				{error && (
					<div className="text-red-500 absolute left-30 mt-1 whitespace-nowrap">
						{error}
					</div>
				)}
			</div>
		</div>
	);
};

export default GenerateRandomArray;
