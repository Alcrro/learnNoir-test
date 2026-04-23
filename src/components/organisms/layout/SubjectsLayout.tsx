import { SubjectOverviewCard } from "../subjects/SubjectOverviewCard";
import { SubjectsCatalogFilters } from "../subjects/SubjectsCatalogFilters";
import { SubjectsCatalogHero } from "../subjects/SubjectsCatalogHero";
import { SubjectsCatalogStats } from "../subjects/SubjectsCatalogStats";
import { useSubjectsCatalog } from "../../../hooks/useSubjectsCatalog";
import {
	SUBJECT_AVAILABILITY_OPTIONS,
	SUBJECT_DOMAINS,
	SUBJECT_TRACK_OPTIONS,
} from "../../../features/subjects/data/subjectsCatalog.data";

const SubjectsLayout = () => {
	const {
		filters,
		filteredSubjects,
		featuredSubjects,
		overallStats,
		filteredStats,
		hasActiveFilters,
		updateSearch,
		updateTrack,
		updateAvailability,
		resetFilters,
	} = useSubjectsCatalog(SUBJECT_DOMAINS);

	return (
		<div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
				<div className="flex flex-col gap-6">
					<SubjectsCatalogHero
						totalSubjects={overallStats.totalSubjects}
						availableSubjects={overallStats.availableSubjects}
					/>

					<SubjectsCatalogStats stats={overallStats} />

					<SubjectsCatalogFilters
						search={filters.search}
						track={filters.track}
						availability={filters.availability}
						trackOptions={SUBJECT_TRACK_OPTIONS}
						availabilityOptions={SUBJECT_AVAILABILITY_OPTIONS}
						resultCount={filteredSubjects.length}
						hasActiveFilters={hasActiveFilters}
						onSearchChange={updateSearch}
						onTrackChange={updateTrack}
						onAvailabilityChange={updateAvailability}
						onReset={resetFilters}
					/>

					{!hasActiveFilters && featuredSubjects.length > 0 ? (
						<section className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
							<div className="mb-4 flex items-center justify-between gap-3">
								<div>
									<h2 className="text-lg font-semibold text-[var(--text-primary)]">
										Featured subjects
									</h2>
									<p className="text-sm text-[var(--text-secondary)]">
										Best entry points if you want to start from the current active
										curriculum.
									</p>
								</div>

								<p className="text-sm text-[var(--text-secondary)]">
									{featuredSubjects.length} highlighted
								</p>
							</div>

							<div className="grid gap-4 lg:grid-cols-2">
								{featuredSubjects.map((subject) => (
									<SubjectOverviewCard
										key={`featured-${subject.id}`}
										subject={subject}
									/>
								))}
							</div>
						</section>
					) : null}

					<section className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
						<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
							<div>
								<h2 className="text-lg font-semibold text-[var(--text-primary)]">
									All subjects
								</h2>
								<p className="text-sm text-[var(--text-secondary)]">
									Browse the full catalog and jump into the subjects that are already
									available.
								</p>
							</div>

							<p className="text-sm text-[var(--text-secondary)]">
								{filteredStats.totalSubjects} visible subjects
							</p>
						</div>

						{filteredSubjects.length > 0 ? (
							<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
								{filteredSubjects.map((subject) => (
									<SubjectOverviewCard
										key={subject.id}
										subject={subject}
									/>
								))}
							</div>
						) : (
							<div className="rounded-[20px] border border-dashed border-[color:var(--border-strong)] bg-[var(--bg-secondary)] px-6 py-14 text-center">
								<p className="text-base font-semibold text-[var(--text-primary)]">
									No subjects found for these filters
								</p>
								<p className="mt-2 text-sm text-[var(--text-secondary)]">
									Try another search term or reset the filters to see the full catalog
									again.
								</p>
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
};

export default SubjectsLayout;
