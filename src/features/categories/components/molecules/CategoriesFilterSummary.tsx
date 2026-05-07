interface CategoriesFilterSummaryProps {
	filteredCount: number;
	search: string;
	onReset: () => void;
}

export function CategoriesFilterSummary({
	filteredCount,
	search,
	onReset,
}: CategoriesFilterSummaryProps) {
	return (
		<div className="flex items-center justify-between mb-4">
			<p className="text-xs text-(--text-secondary)">
				{filteredCount > 0 ? (
					<>
						{filteredCount} result{filteredCount !== 1 ? "s" : ""}
						{search && (
							<>
								{" "}
								for{" "}
								<em className="not-italic text-(--text-secondary)">"{search}"</em>
							</>
						)}
					</>
				) : (
					"No results"
				)}
			</p>
			<button
				onClick={onReset}
				className="text-xs text-(--text-secondary) hover:text-(--text-primary) underline underline-offset-2 transition-colors"
			>
				Reset filters
			</button>
		</div>
	);
}
