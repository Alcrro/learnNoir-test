import type { FC } from "react";
import { cn } from "../../libs/utils/cn";

type AlgorithInfoCardardProps = {
	description: string;
	currentComparedCount?: string;
	totalComparedCount: string;
};
const AlgorithmInfoCard: FC<AlgorithInfoCardardProps> = ({
	description,
	currentComparedCount,
	totalComparedCount,
}) => {
	return (
		<div
			className={cn("p-5 bg-(--bg-color) text-2xl rounded-2xl max-w-70 w-full")}
		>
			<div className="uppercase text-center text-violet-400">{description}</div>
			<div className="flex justify-center gap-2 p-5 text-blue-500">
				{currentComparedCount ? (
					<>
						<span>{currentComparedCount}</span>
						<span>/</span>
					</>
				) : null}
				<span>{totalComparedCount}</span>
			</div>
		</div>
	);
};

export default AlgorithmInfoCard;
