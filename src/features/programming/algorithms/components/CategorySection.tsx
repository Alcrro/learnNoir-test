import AlgorithmCard, { AlgorithmCardProps } from "./AlgorithmCard";

type Category = {
	category: string;
	items: AlgorithmCardProps[];
};

const CategorySection = ({ category }: { category: Category }) => {
	return (
		<div className="space-y-3 pb-2 ">
			<h2 className="text-xl font-semibold capitalize tracking-tight">
				{category.category}
			</h2>

			<ul
				className="grid gap-4 bg-(--bg-tertiary) p-4 rounded-md justify-center"
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
