import { Algorithm } from "../data/algorithmsData";
import AlgorithmCard from "./AlgorithmCard";

type Category = {
	category: string;
	items: Algorithm[];
};

const CategorySection = ({ category }: { category: Category }) => {
	return (
		<div className="space-y-3 pb-2 ">
			<div className="category_title flex gap-2 items-center">
				<h2 className="text-xl font-semibold capitalize tracking-tight">
					{category.category}
				</h2>
				<span className="text-(--text-secondary) text-sm">
					{category.items.length} lessons
				</span>
			</div>

			<ul
				className="grid gap-4 bg-(--bg-page) rounded-md justify-center"
				style={{
					gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
					maxWidth: "100%",
				}}
			>
				{category.items.map((item) => (
					<AlgorithmCard
						key={item.path}
						item={item}
					/>
				))}
			</ul>
		</div>
	);
};
export default CategorySection;
