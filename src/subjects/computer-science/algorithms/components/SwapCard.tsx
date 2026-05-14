import { type FC } from "react";

type SwapCardProps = {
	swap: string;
	totalSwaps: string;
};
const SwapCard: FC<SwapCardProps> = ({ swap, totalSwaps }) => {
	return (
		<>
			{totalSwaps ? (
				<>
					<span>{swap}</span>
					<span>/</span>
				</>
			) : null}
			<span>{totalSwaps}</span>
		</>
	);
};

export default SwapCard;
