import React from "react";
import DefaultLabelForm from "../atoms/DefaultLabelForm";
import DefaultInputForm from "../atoms/DefaultInputForm";

const PassworFormGroup = () => {
	return (
		<>
			<DefaultLabelForm
				label="Password"
				htmlFor="password"
			/>
			<DefaultInputForm
				type="password"
				name="password"
				placeholder="Add your password"
				className=""
			/>
		</>
	);
};

export default PassworFormGroup;
