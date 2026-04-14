import { Algorithm } from "../../data/algorithmsData";
import StatCard from "./statsGrid/StatCard";

type Props = {
	algorithms: Algorithm[];
};

const StatsGrid = ({ algorithms }: Props) => {
	const total = algorithms.length;

	// TODO: derive real values
	const completed = 3;
	const inProgress = 2;
	const remainingTime = "~4h";

	return (
		<div className="pb-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
			<StatCard
				label="Total lessons"
				value={total}
			/>
			<StatCard
				label="Completed"
				value={completed}
				color="text-[#1D9E75]"
			/>
			<StatCard
				label="In progress"
				value={inProgress}
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
