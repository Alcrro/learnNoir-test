import { ArrowRightCircle } from "lucide-react";
import DefaultButton from "../../atoms/DefaultButton";

const NextButton = ({
	currentStep,
	steps,
	handleNextStep,
}: {
	currentStep: number;
	steps: number;
	handleNextStep: () => void;
}) => {
	return (
		<DefaultButton
			variant={currentStep + 1 === steps ? "ghost" : "icon"}
			size="icon"
			onClick={handleNextStep}
			disabled={currentStep + 1 === steps}
		>
			<ArrowRightCircle className="size-8" />
		</DefaultButton>
	);
};

export default NextButton;
