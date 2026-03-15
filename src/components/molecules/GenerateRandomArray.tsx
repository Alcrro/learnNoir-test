import {
	useState,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from "react";
import DefaultButton from "../atoms/DefaultButton";
import Input from "./Input";
import { useAlgorithmStore } from "../../store/useAlgorithmStore";
import { generateArray } from "../../libs/utils/generateArray";
import { ShuffleIcon } from "lucide-react";
import { useReset } from "../../features/programming/visualizer/hooks/useReset";

type GenerateRandomArrayProps = {
	size?: number;
	setSize?: Dispatch<SetStateAction<number>>;
	minValue?: number;
	maxValue?: number;
	setMinValueState?: Dispatch<SetStateAction<number>>;
	setMaxValueState?: Dispatch<SetStateAction<number>>;
	setCurrentStep: (value: number) => void;
	boxesRef: RefObject<HTMLDivElement[]>;
};
const GenerateRandomArray = ({
	size = 10,
	setSize,
	setCurrentStep,
	boxesRef,
}: GenerateRandomArrayProps) => {
	const setGeneratedArray = useAlgorithmStore(
		(store) => store.setGeneratedArray,
	);
	const [error, setError] = useState("");

	//reset steps
	const { reset } = useReset(boxesRef, setCurrentStep);

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
		<div className="flex gap-2 justify-center items-center flex-wrap max-sm:w-full">
			<DefaultButton
				variant="primary"
				size="lg"
				onClick={onGenerate}
				className="rounded-xl bg-(--bg-color) max-sm:max-w-66.25 max-sm:w-full max-sm:px-0"
			>
				<div className="flex gap-2 justify-center max-sm:flex-wrap ">
					<ShuffleIcon /> <span className="uppercase"> Generate array</span>
				</div>
			</DefaultButton>
			<div className="flex flex-col gap-2 relative ">
				<div className="mr-auto capitalize text-xl text-blue-400">
					<span>elements:</span> <span>{size}</span>
				</div>

				<div className="bar w-full">
					<Input
						value={size}
						minValue={3}
						type="range"
						maxValue={30}
						onChange={handleSizeChange}
						className="min-w-70"
					/>
				</div>
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
