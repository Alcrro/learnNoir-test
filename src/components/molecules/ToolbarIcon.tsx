import type { FC } from "react";
import { cn } from "../../libs/utils/cn";

type DocContainerProps = {
	title: string;
	handleClick: () => void;
	classname?: string;
};

const ToolbarIcon: FC<DocContainerProps> = ({
	title,
	handleClick,
	classname,
}) => {
	return (
		<div
			className={cn(
				"mx-auto my-2 w-8 h-3 bg-(--text-muted) rounded-2xl hover:bg-(--text-primary) cursor-pointer",
				classname,
			)}
			title={title}
			onClick={handleClick}
		></div>
	);
};

export default ToolbarIcon;
