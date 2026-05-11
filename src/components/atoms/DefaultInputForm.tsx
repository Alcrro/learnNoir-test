import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "../../libs/utils/cn";

type Props = {
	type: HTMLInputTypeAttribute;
	style?: DefaultInputFormStyle | "defaultInputForm";
	classname?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const DefaultInputForm = ({
	style = "defaultInputForm",
	classname,
	...props
}: Props) => {
	return (
		<input
			{...props}
			className={cn(styles[style], classname)}
		/>
	);
};

export default DefaultInputForm;

const styles: Record<string, string> = {
	defaultInputForm:
		"w-full p-2 border border-(--border) rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
	modal:
		"w-full rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[color:var(--blue)] focus:outline-none transition disabled:opacity-50",
} satisfies Record<string, string>;

type DefaultInputFormStyle = keyof typeof styles;
