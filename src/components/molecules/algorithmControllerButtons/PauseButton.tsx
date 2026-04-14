import DefaultButton from "../../atoms/DefaultButton";
import { PauseCircle } from "lucide-react";

const PauseButton = ({ pauseHandler }: { pauseHandler: () => void }) => {
	return (
		<DefaultButton
			variant="destructive"
			className="flex justify-center items-center size-12 p-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-700"
			onClick={pauseHandler}
		>
			<PauseCircle className="size-8" />
		</DefaultButton>
	);
};

export default PauseButton;
