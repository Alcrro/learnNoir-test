import { ArrowLeftCircle } from "lucide-react";
import DefaultButton from "../../../../../../components/atoms/DefaultButton";

const PrevButton = ({
	currentStep,
	handlePrevStep,
}: {
	currentStep: number;
	handlePrevStep: () => void;
}) => {
	return (
		<DefaultButton
			variant={currentStep < 0 ? "ghost" : "icon"}
			size="icon"
			onClick={handlePrevStep}
		>
			<ArrowLeftCircle className="size-8" />
		</DefaultButton>
	);
};

export default PrevButton;
