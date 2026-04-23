import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import type { Algorithm } from "../data/algorithmsData";
import LessonMetaBadge from "../../../../components/atoms/LessonMetaBadge";

export type AlgorithmCardProps = {
	progress: number;
	path: string;
	name: string;
};
const AlgorithmCard = ({ item }: { item: Algorithm }) => {
	const progress =
		item.status === "completed"
			? 100
			: item.status === "in-progress"
				? 45
				: 0;

	return (
		<li>
			<Link
				to={item.path}
				className="
					group flex flex-col h-44 rounded-xl border border-(--border)
					bg-(--bg-card) backdrop-blur
					p-4
					transition-all
					hover:border-(--border-strong) hover:shadow-md
					focus:outline-none focus:ring-2 focus:ring-blue-500
				"
			>
				<div className="header flex justify-between">
					<div className="text-sm font-medium text-(--text-secondary) group-hover:text-(--text-primary)">
						{item.name}
					</div>
					<LessonMetaBadge
						name={item.difficulty}
						classname="badge py-1 px-3 bg-(--blue-bg) text-[--blue-text] rounded-2xl"
					/>
				</div>

				<div className="flex-1" />

				<ProgressBar value={progress} />
			</Link>
		</li>
	);
};

export default AlgorithmCard;
