import type { ReactNode, SelectHTMLAttributes } from "react";
import DefaultLabelForm from "../atoms/DefaultLabelForm";
import { modalSelectClass } from "../styles/formVariants";

type Props = {
	id: string;
	label: string;
	required?: boolean;
	children: ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">;

export function FormSelectField({ id, label, required, children, ...selectProps }: Props) {
	return (
		<div>
			<DefaultLabelForm label={label} htmlFor={id} style="modal" required={required} classname="mb-2 block" />
			<select id={id} className={modalSelectClass} {...selectProps}>
				{children}
			</select>
		</div>
	);
}
