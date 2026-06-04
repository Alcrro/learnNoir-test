interface CategoriesHeaderProps {
	title: string;
	subjectCount: number;
	categoryCount: number;
}

export function CategoriesHeader({ title, subjectCount, categoryCount }: CategoriesHeaderProps) {
	return (
		<div className="flex items-end justify-between gap-4 flex-wrap">
			<div>
				<h1 className="text-2xl font-medium text-(--text-primary) tracking-tight">
					{title}
				</h1>
				<p className="text-sm text-(--text-secondary) mt-1">
					{subjectCount} subjects · {categoryCount} categories
				</p>
			</div>
		</div>
	);
}
