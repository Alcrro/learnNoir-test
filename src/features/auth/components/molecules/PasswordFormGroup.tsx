import DefaultLabelForm from "../../../../components/atoms/DefaultLabelForm";
import DefaultInputForm from "../../../../components/atoms/DefaultInputForm";

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
