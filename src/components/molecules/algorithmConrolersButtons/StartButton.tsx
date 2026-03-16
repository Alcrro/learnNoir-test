import DefaultButton from "../../atoms/DefaultButton";
import { PlayCircle } from "lucide-react";

const StartButton = ({ playHandler }: { playHandler: () => void }) => {
	return (
		<DefaultButton
			variant="primary"
			className="size-12 rounded-2xl hover:bg-purple-900"
			size="icon"
			onClick={playHandler}
		>
			<PlayCircle className="size-8" />
		</DefaultButton>
	);
};

export default StartButton;
