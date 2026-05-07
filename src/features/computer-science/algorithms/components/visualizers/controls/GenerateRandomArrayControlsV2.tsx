import { useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import { useAlgorithmStore } from "../../../../../../store/useAlgorithmStore";
import { generateArray } from "../../../../../../libs/utils/generateArray";
import { useReset } from "../../../../visualizer/hooks/useReset";
import GenerateRandomArrayButtonV2 from "./GenerateRandomArrayButtonV2";

type Props = {
	size?: number;
	setSize?: Dispatch<SetStateAction<number>>;
	setCurrentStep: (value: number) => void;
	boxesRef: RefObject<HTMLDivElement[]>;
};

const MIN = 3;
const MAX = 30;

const GenerateRandomArrayControlsV2 = ({
	size = 10,
	setSize,
	setCurrentStep,
	boxesRef,
}: Props) => {
	const setGeneratedArray = useAlgorithmStore((s) => s.setGeneratedArray);
	const [error, setError] = useState("");
	const { reset } = useReset(boxesRef, setCurrentStep);

	const onGenerate = () => {
		if (size < MIN || size > MAX) {
			setError(`${MIN}–${MAX} only`);
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
		setError(value < MIN ? `min ${MIN}` : value > MAX ? `max ${MAX}` : "");
		setSize?.(value);
	};

	return (
		<div className="flex items-center gap-3 pb-2 flex-wrap max-[420px]:flex-col max-[420px]:items-start">
			<GenerateRandomArrayButtonV2 onClick={onGenerate} />

			<div className="flex items-center gap-2 flex-1 min-w-48">
				<span className="text-xs font-mono text-(--text-muted) shrink-0 select-none tabular-nums">
					n =
				</span>
				<input
					type="range"
					min={MIN}
					max={MAX}
					value={size}
					onChange={handleSizeChange}
					className="flex-1 h-1 appearance-none rounded-full cursor-pointer
						bg-(--border)
						[&::-webkit-slider-thumb]:appearance-none
						[&::-webkit-slider-thumb]:w-3
						[&::-webkit-slider-thumb]:h-3
						[&::-webkit-slider-thumb]:rounded-full
						[&::-webkit-slider-thumb]:bg-(--default_color)
						[&::-webkit-slider-thumb]:cursor-pointer
						[&::-webkit-slider-thumb]:transition-transform
						[&::-webkit-slider-thumb]:duration-100
						[&::-webkit-slider-thumb:hover]:scale-125"
				/>
				<span className="text-xs font-mono tabular-nums text-(--text-primary) w-5 text-right shrink-0 select-none">
					{size}
				</span>
			</div>

			{error && (
				<span className="text-xs font-mono text-red-400 shrink-0">{error}</span>
			)}
		</div>
	);
};

export default GenerateRandomArrayControlsV2;
