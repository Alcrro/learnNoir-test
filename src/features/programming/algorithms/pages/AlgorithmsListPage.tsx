import { algorithms } from "../../../../content/sidebarData";
import { useSidebarGroup } from "../../../../libs/utils/useSidebarGroup";
import CategorySection from "../components/CategorySection";

const AlgorithmsListPage = () => {
	const { grouped } = useSidebarGroup(algorithms.algorithms);

	return (
		<div className="bg-(--bg-color) p-4">
			{grouped.map((category) => (
				<CategorySection
					key={category.category}
					category={category}
				/>
			))}
		</div>
	);
};

export default AlgorithmsListPage;
