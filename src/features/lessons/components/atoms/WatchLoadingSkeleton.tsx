export function WatchLoadingSkeleton() {
	return (
		<div className="space-y-3 py-4">
			{[1, 2, 3].map((i) => (
				<div key={i} className="h-4 animate-pulse rounded bg-(--border)" />
			))}
		</div>
	);
}
