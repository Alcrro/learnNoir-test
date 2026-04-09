import React from "react";

type DefaultLabelFormProps = {
	label: string;
	htmlFor: string;
	classname?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
const DefaultLabelForm = (props: DefaultLabelFormProps) => {
	return (
		<label
			className={props.classname}
			{...props}
		>
			{props.label}
		</label>
	);
};

export default DefaultLabelForm;
