import React from "react";
import { cn } from "../../libs/utils/cn";

const styles: Record<string, string> = {
	default: "",
	modal: "text-sm font-medium text-(--text-secondary)",
} satisfies Record<string, string>;

type DefaultLabelFormStyle = keyof typeof styles;

type DefaultLabelFormProps = {
	label: string;
	htmlFor: string;
	style?: DefaultLabelFormStyle;
	required?: boolean;
	classname?: string;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "style">;

const DefaultLabelForm = ({
	label,
	htmlFor,
	style = "default",
	required,
	classname,
	...props
}: DefaultLabelFormProps) => {
	return (
		<label htmlFor={htmlFor} className={cn(styles[style], classname)} {...props}>
			{label}
			{required && <span className="ml-0.5 text-[rgb(244,63,94)]">*</span>}
		</label>
	);
};

export default DefaultLabelForm;
