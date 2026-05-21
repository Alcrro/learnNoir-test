import { ProgrammingCatalogItem } from "../../../catalog/types/catalog.types";
import StatCard from "./statsGrid/StatCard";

type Props = {
	algorithms: ProgrammingCatalogItem[];
};

const StatsGrid = ({ algorithms }: Props) => {
	const total = algorithms.length;
	const findInProgressCounter = algorithms.filter(
		(f) => f.status === "in-progress",
	).length;
	const completedCounter = algorithms.filter(
		(f) => f.status === "completed",
	).length;
	// TODO: derive real values

	const remainingTime = "~4h";

	return (
		<div className="pb-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
			<StatCard
				label="Total lessons"
				value={total}
			/>
			<StatCard
				label="Completed"
				value={completedCounter}
				color="text-[#1D9E75]"
			/>
			<StatCard
				label="In progress"
				value={findInProgressCounter}
				color="text-[#378ADD]"
			/>
			<StatCard
				label="Time remaining"
				value={remainingTime}
			/>
		</div>
	);
};

export default StatsGrid;
