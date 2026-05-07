interface CategoriesHeaderProps {
	subjectCount: number;
	categoryCount: number;
}

export function CategoriesHeader({ subjectCount, categoryCount }: CategoriesHeaderProps) {
	return (
		<div className="flex items-end justify-between gap-4 flex-wrap">
			<div>
				<h1 className="text-2xl font-medium text-(--text-primary) tracking-tight">
					Computer Science
				</h1>
				<p className="text-sm text-(--text-secondary) mt-1">
					{subjectCount} subjects · {categoryCount} categories
				</p>
			</div>
		</div>
	);
}
