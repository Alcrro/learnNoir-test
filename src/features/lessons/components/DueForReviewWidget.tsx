import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { useDueForReviewQuery } from "../hooks/useDueForReviewQuery";
import {
	DashboardPanel,
	DashboardSectionHeading,
} from "../../dashboards/components/DashboardUI";

const MAX_VISIBLE = 5;

function dueBadgeLabel(daysUntilReview: number | null): string {
	if (daysUntilReview === null) return "";
	if (daysUntilReview === 0) return "due azi";
	if (daysUntilReview < 0) return `overdue ${Math.abs(daysUntilReview)} zile`;
	return `în ${daysUntilReview} zile`;
}

export function DueForReviewWidget() {
	const { dueItems, isLoading } = useDueForReviewQuery();

	if (isLoading || dueItems.length === 0) return null;

	const visible = dueItems.slice(0, MAX_VISIBLE);
	const hasMore = dueItems.length > MAX_VISIBLE;

	return (
		<DashboardPanel>
			<DashboardSectionHeading
				eyebrow="Repetiție spațiată"
				title="De revăzut azi"
				description="Lecțiile de mai jos sunt programate pentru consolidare. Revedeți-le acum pentru retenție optimă."
			/>
			<ul className="mt-4 space-y-2">
				{visible.map((item) => {
					const isOverdue = (item.sr.daysUntilReview ?? 1) <= 0;
					return (
						<li key={item.lessonId}>
							<Link
								to={`/lessons/${item.lessonSlug}`}
								className="flex items-center justify-between gap-3 rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-3 text-sm transition hover:bg-(--bg-elevated)"
							>
								<span className="flex items-center gap-2 font-medium text-(--text-primary)">
									<RotateCcw className="h-4 w-4 shrink-0 text-(--text-secondary)" />
									{item.lessonTitle}
								</span>
								<span
									className={
										isOverdue
											? "shrink-0 text-xs font-semibold text-amber-500"
											: "shrink-0 text-xs text-(--text-secondary)"
									}
								>
									{dueBadgeLabel(item.sr.daysUntilReview)}
								</span>
							</Link>
						</li>
					);
				})}
			</ul>
			{hasMore && (
				<p className="mt-3 text-xs text-(--text-secondary)">
					+{dueItems.length - MAX_VISIBLE} lecții suplimentare de revăzut.
				</p>
			)}
		</DashboardPanel>
	);
}
