import React from "react";
import DefaultLabelForm from "../../../../components/atoms/DefaultLabelForm";
import DefaultInputForm from "../../../../components/atoms/DefaultInputForm";

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
