import DefaultButton from "../../atoms/DefaultButton";
import { PauseCircle } from "lucide-react";

const PauseButton = ({ pauseHandler }: { pauseHandler: () => void }) => {
	return (
		<DefaultButton
			variant="destructive"
			className="p-2 bg-gray-500 text-white rounded-2xl h-fit hover:bg-black"
			onClick={pauseHandler}
		>
			<PauseCircle className="size-8" />
		</DefaultButton>
	);
};

export default PauseButton;
