import React from "react";
import DefaultButton from "../../atoms/DefaultButton";
import { ArrowRightSquare } from "lucide-react";

const NextStepInteractionBtn = ({
	handleNextStep,
}: {
	handleNextStep: () => void;
}) => {
	return (
		<DefaultButton
			variant="icon"
			size="icon"
			className="mx-auto"
			onClick={handleNextStep}
		>
			<ArrowRightSquare className="size-10 rounded-md hover:text-green-500" />
		</DefaultButton>
	);
};

export default NextStepInteractionBtn;
