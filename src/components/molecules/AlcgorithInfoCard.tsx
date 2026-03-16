import type { FC, ReactNode } from "react";
import { cn } from "../../libs/utils/cn";

type AlgorithInfoCardardProps = {
	description: string;
	children: ReactNode;
};
const AlgorithmInfoCard: FC<AlgorithInfoCardardProps> = ({
	description,
	children,
}) => {
	return (
		<div
			className={cn(
				"p-5 bg-(--bg-card) border border-(--border-subtle) text-2xl rounded-2xl w-full ",
			)}
		>
			<div className="uppercase text-center text-violet-400">{description}</div>
			<div className="flex justify-center gap-2 p-5 text-blue-500">{children}</div>
		</div>
	);
};

export default AlgorithmInfoCard;
