import { SubjectsCatalogFilters } from "../organisms/SubjectsCatalogFilters";
import { SubjectsCatalogHero } from "../organisms/SubjectsCatalogHero";
import { SubjectsCatalogStats } from "../organisms/SubjectsCatalogStats";
import { FeaturedSubjectsSection } from "../organisms/FeaturedSubjectsSection";
import { AllSubjectsSection } from "../organisms/AllSubjectsSection";
import { useSubjectsCatalog } from "../../hooks/useSubjectsCatalog";
import { useSubjectsQuery } from "../../hooks/useSubjectsQuery";
import {
	SUBJECT_AVAILABILITY_OPTIONS,
	SUBJECT_TRACK_OPTIONS,
} from "../../data/subjectsCatalog.data";

const SubjectsLayout = () => {
	const { data: subjects = [], isLoading, isError } = useSubjectsQuery();

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
	} = useSubjectsCatalog(subjects);

	return (
		<div className="min-h-screen bg-(--bg-page) text-(--text-primary) transition-colors duration-300">
			<div className="mx-auto max-w-7xl py-8">
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

					{!hasActiveFilters && (
						<FeaturedSubjectsSection subjects={featuredSubjects} />
					)}

					<AllSubjectsSection
						subjects={filteredSubjects}
						totalVisible={filteredStats.totalSubjects}
						isLoading={isLoading}
						isError={isError}
					/>
				</div>
			</div>
		</div>
	);
};

export default SubjectsLayout;
