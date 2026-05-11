import type { InputHTMLAttributes, ReactNode } from "react";
import DefaultLabelForm from "../atoms/DefaultLabelForm";
import DefaultInputForm from "../atoms/DefaultInputForm";

type Props = {
	id: string;
	label: string;
	type: string;
	required?: boolean;
	action?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "style">;

export function FormField({ id, label, type, required, action, ...inputProps }: Props) {
	return (
		<div>
			{action ? (
				<div className="mb-2 flex items-center justify-between gap-2">
					<DefaultLabelForm label={label} htmlFor={id} style="modal" required={required} />
					{action}
				</div>
			) : (
				<DefaultLabelForm label={label} htmlFor={id} style="modal" required={required} classname="mb-2 block" />
			)}
			<DefaultInputForm id={id} type={type} style="modal" {...inputProps} />
		</div>
	);
}
