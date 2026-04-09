import React from "react";
import DefaultLabelForm from "../../atoms/DefaultLabelForm";
import DefaultInputForm from "../../atoms/DefaultInputForm";

const EmailFormGroup = () => {
	return (
		<>
			<DefaultLabelForm
				label="Email"
				htmlFor="email"
			/>
			<DefaultInputForm
				type="email"
				name="email"
				placeholder="Add your email"
			/>
		</>
	);
};

export default EmailFormGroup;
