type Props = { progress: number; isCompleted: boolean };

export function ReadProgressBar({ progress, isCompleted }: Props) {
	return (
		<div className="mb-4 flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface) px-4 py-2.5">
			<div className="flex-1 h-1.5 rounded-full bg-(--border) overflow-hidden">
				<div
					className="h-1.5 rounded-full bg-blue-500 transition-all duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>
			<span className="shrink-0 text-xs text-(--text-muted) tabular-nums">
				{isCompleted ? "Completat · 100%" : `Citit · ${progress}%`}
			</span>
		</div>
	);
}
