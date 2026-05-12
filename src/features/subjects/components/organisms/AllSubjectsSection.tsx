import type { SubjectDomain } from "../../../../types/types";
import { SubjectEmptyState } from "../atoms/SubjectEmptyState";
import { SubjectOverviewCard } from "./SubjectOverviewCard";

type Props = {
	subjects: SubjectDomain[];
	totalVisible: number;
	isLoading: boolean;
	isError: boolean;
};

export function AllSubjectsSection({ subjects, totalVisible, isLoading, isError }: Props) {
	return (
		<section className="rounded-3xl border border-(--border) bg-(--bg-card) p-5 shadow-sm">
			<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-(--text-primary)">All subjects</h2>
					<p className="text-sm text-(--text-secondary)">
						Browse the full catalog and jump into the subjects that are already available.
					</p>
				</div>
				{!isLoading && (
					<p className="text-sm text-(--text-secondary)">{totalVisible} visible subjects</p>
				)}
			</div>

			{isLoading ? (
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-52 animate-pulse rounded-2xl bg-(--bg-secondary)" />
					))}
				</div>
			) : isError ? (
				<SubjectEmptyState
					title="Could not load subjects"
					description="Check that the API is running and try refreshing the page."
				/>
			) : subjects.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{subjects.map((subject) => (
						<SubjectOverviewCard key={subject.id} subject={subject} />
					))}
				</div>
			) : (
				<SubjectEmptyState
					title="No subjects found for these filters"
					description="Try another search term or reset the filters to see the full catalog again."
				/>
			)}
		</section>
	);
}
