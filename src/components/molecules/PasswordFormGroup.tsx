import DefaultLabelForm from "../atoms/DefaultLabelForm";
import DefaultInputForm from "../atoms/DefaultInputForm";

const PasswordFormGroup = () => {
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

export default PasswordFormGroup;
