interface CategoriesEmptyStateProps {
	onReset: () => void;
}

export function CategoriesEmptyState({ onReset }: CategoriesEmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-24 text-center">
			<div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center mb-4">
				<svg
					className="w-5 h-5 text-(--text-secondary)"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.5}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>
			<p className="text-sm font-medium text-(--text-primary) mb-1">
				No subjects found
			</p>
			<p className="text-xs text-(--text-secondary) mb-5 max-w-xs">
				Try a different search term or clear your filters.
			</p>
			<button
				onClick={onReset}
				className={[
					"text-xs px-4 py-2 rounded-lg",
					"border border-(--border)",
					"text-(--text-secondary)",
					"hover:bg-(--bg-primary)",
					"transition-colors duration-150",
				].join(" ")}
			>
				Clear all filters
			</button>
		</div>
	);
}
