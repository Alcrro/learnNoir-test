import React, {
	type HTMLInputTypeAttribute,
	type InputHTMLAttributes,
} from "react";
import { cn } from "../../libs/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	value: number;
	type: HTMLInputTypeAttribute;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	minValue?: number;
	maxValue?: number;
	className: string;
};
const Input = ({
	value,
	onChange,
	minValue = 0,
	maxValue,
	type = "text",
	className,
}: InputProps) => {
	return (
		<input
			type={type}
			min={minValue}
			max={maxValue}
			value={value}
			onChange={onChange}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.currentTarget.blur();
				}
			}}
			className={cn("size-8 text-center border rounded-md", className)}
		/>
	);
};

export default Input;
