import React from "react";

type Props = {
	grouped: { category: string }[];
};

const CategoryFilters = ({ grouped }: Props) => {
	return (
		<div className="py-2">
			<div className="flex gap-4">
				{grouped.map((category) => (
					<div
						key={category.category}
						className="border-2 border-(--border-strong) p-2 rounded-xl hover:bg-(--bg-card) cursor-pointer"
					>
						{category.category}
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryFilters;
