import { ArrowLeftSquare } from "lucide-react";
import React from "react";
import DefaultButton from "../../atoms/DefaultButton";

const PrevStepInteractionBtn = ({ handlePrev }: { handlePrev: () => void }) => {
	return (
		<DefaultButton
			variant="icon"
			size="icon"
			className="mx-auto"
			onClick={handlePrev}
		>
			<ArrowLeftSquare className="size-10 rounded-md hover:text-green-500" />
		</DefaultButton>
	);
};

export default PrevStepInteractionBtn;
