import DefaultButton from "../../atoms/DefaultButton";
import { RotateCcw } from "lucide-react";

const ResetButton = ({ resetHandler }: { resetHandler: () => void }) => {
	return (
		<DefaultButton
			variant="destructive"
			className="flex justify-center items-center size-12 p-2 bg-(--btn-danger-bg) text-white rounded-2xl  hover:bg-(--btn-danger-hover)"
			onClick={resetHandler}
		>
			<RotateCcw className="size-8 " />
		</DefaultButton>
	);
};

export default ResetButton;
