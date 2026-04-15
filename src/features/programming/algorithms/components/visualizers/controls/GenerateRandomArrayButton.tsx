import DefaultButton from "../../../../../../components/atoms/DefaultButton";
import { ShuffleIcon } from "lucide-react";

const GenerateRandomArrayButton = ({
	generateHandler,
}: {
	generateHandler: () => void;
}) => {
	return (
		<DefaultButton
			variant="primary"
			size="lg"
			onClick={generateHandler}
			className="rounded-xl max-sm:max-w-46.25 max-sm:w-full max-sm:px-0 h-16"
		>
			<div className="flex gap-2 justify-center max-sm:flex-wrap">
				<ShuffleIcon /> <span className="uppercase"> Generate array</span>
			</div>
		</DefaultButton>
	);
};

export default GenerateRandomArrayButton;
