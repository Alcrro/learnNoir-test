import DefaultButton from "../../atoms/DefaultButton";
import { RotateCcw } from "lucide-react";

const ResetButton = ({ resetHandler }: { resetHandler: () => void }) => {
	return (
		<DefaultButton
			variant="destructive"
			className="p-2 bg-red-500 text-white rounded-2xl h-fit hover:bg-red-700"
			onClick={resetHandler}
		>
			<RotateCcw className="size-8" />
		</DefaultButton>
	);
};

export default ResetButton;
