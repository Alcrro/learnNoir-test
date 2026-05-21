import AlgorithmInfoCard from "./AlgorithmInfoCard";
import ComparisonCard from "./ComparisonCard";
import ComplexityCard from "./ComplexityCard";
import SwapCard from "./SwapCard";
import TimeComplexityCard from "./TimeComplexityCard";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { getAlgorithmStats } from "../../../../libs/utils/AlgorithmStates";
import { useMemo } from "react";

const AlgorithmStats = () => {
	const currentStep = useAlgorithmStore((store) => store.currentStep);
	const steps = useAlgorithmStore((store) => store.steps);

	const { totalComparisons, totalSwaps, currentComparisons, currentSwaps } =
		useMemo(() => getAlgorithmStats(steps, currentStep), [steps, currentStep]);

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-sm:grid-cols-1 gap-2">
			<AlgorithmInfoCard description="comparisons">
				<ComparisonCard
					currentComparedCount={currentComparisons ?? undefined}
					totalComparedCount={totalComparisons}
				/>
			</AlgorithmInfoCard>
			<AlgorithmInfoCard description="swaps">
				<SwapCard
					swap={currentSwaps}
					totalSwaps={totalSwaps}
				/>
			</AlgorithmInfoCard>
			<AlgorithmInfoCard description="time">
				<TimeComplexityCard />
			</AlgorithmInfoCard>
			<AlgorithmInfoCard description="complexity">
				<ComplexityCard complexity={"average"} />
			</AlgorithmInfoCard>
		</div>
	);
};

export default AlgorithmStats;
