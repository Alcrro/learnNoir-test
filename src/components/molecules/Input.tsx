import React from "react";

type InputProps = {
	value: number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	minValue?: number;
	maxValue?: number;
};
const Input = ({ value, onChange, minValue = 0, maxValue }: InputProps) => {
	return (
		<input
			type="text"
			min={minValue}
			max={maxValue}
			value={value}
			onChange={onChange}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.currentTarget.blur();
				}
			}}
			className="size-8 text-center border rounded-md"
		/>
	);
};

export default Input;
