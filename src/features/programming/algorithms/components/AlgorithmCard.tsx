import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const AlgorithmCard = ({ item }: { item: any }) => {
	const progress = item.progress ?? 0;

	return (
		<li>
			<Link
				to={item.path}
				className="
					group flex flex-col h-44 rounded-xl border
					bg-white/5 backdrop-blur
					p-4
					transition-all
					hover:border-white/30 hover:shadow-md
					focus:outline-none focus:ring-2 focus:ring-blue-500
				"
			>
				<div className="text-sm font-medium text-white/90 group-hover:text-white">
					{item.name}
				</div>

				<div className="flex-1" />

				<ProgressBar value={progress} />
			</Link>
		</li>
	);
};

export default AlgorithmCard;
