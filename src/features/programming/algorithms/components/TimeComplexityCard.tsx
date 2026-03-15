import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

const TimeComplexityCard = () => {
	const time = useAlgorithmStore((store) => store.time);

	return <div>{`${String(time.toFixed(2))} ms`}</div>;
};

export default TimeComplexityCard;
