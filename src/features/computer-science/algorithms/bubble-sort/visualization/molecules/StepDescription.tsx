interface StepDescriptionProps {
	text: string;
}

export function StepDescription({ text }: StepDescriptionProps) {
	return (
		<div className="rounded-xl border border-(--border) px-4 py-3 bg-(--bg-secondary) min-h-12 flex items-center">
			<p className="text-sm text-(--text-primary) leading-relaxed">{text}</p>
		</div>
	);
}
