type Props = {
	title: string;
	description: string;
};

export function SubjectEmptyState({ title, description }: Props) {
	return (
		<div className="rounded-[20px] border border-dashed border-(--border-strong) bg-(--bg-secondary) px-6 py-14 text-center">
			<p className="text-base font-semibold text-(--text-primary)">{title}</p>
			<p className="mt-2 text-sm text-(--text-secondary)">{description}</p>
		</div>
	);
}
