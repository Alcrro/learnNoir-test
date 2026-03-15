import type { FC } from "react";

type ComparisonCardProps = {
	currentComparedCount: string;
	totalComparedCount: string;
};
const ComparisonCard: FC<ComparisonCardProps> = ({
	currentComparedCount,
	totalComparedCount,
}) => {
	return (
		<>
			{currentComparedCount ? (
				<>
					<span>{currentComparedCount}</span>
					<span>/</span>
				</>
			) : null}
			<span>{totalComparedCount}</span>
		</>
	);
};

export default ComparisonCard;
