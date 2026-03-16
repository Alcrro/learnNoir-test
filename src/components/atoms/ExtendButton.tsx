import { type FC } from "react";
import DefaultButton from "./DefaultButton";
import { ChevronLeft } from "lucide-react";

type ExtendButtonProps = {
	active: boolean;
	toggle: () => void;
};
const ExtendButton: FC<ExtendButtonProps> = ({ active, toggle }) => {
	return (
		<DefaultButton
			variant="icon"
			size="icon"
			onClick={toggle}
			className={`xl:hidden hover:bg-(--surface-hover) ${active ? "rotate-180 " : "text-(--text-color) rotate-0 bg-(--bg-color)"} rounded-xl`}
		>
			<ChevronLeft
				className={`size-8 transition-transform duration-1000  ${active ? "rotate-0" : ""}`}
			/>
		</DefaultButton>
	);
};

export default ExtendButton;
