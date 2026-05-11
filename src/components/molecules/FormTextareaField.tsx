import type { TextareaHTMLAttributes } from "react";
import DefaultLabelForm from "../atoms/DefaultLabelForm";
import { modalTextareaClass } from "../styles/formVariants";

type Props = {
	id: string;
	label: string;
	required?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

export function FormTextareaField({ id, label, required, ...textareaProps }: Props) {
	return (
		<div>
			<DefaultLabelForm label={label} htmlFor={id} style="modal" required={required} classname="mb-2 block" />
			<textarea id={id} className={modalTextareaClass} {...textareaProps} />
		</div>
	);
}
