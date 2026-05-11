import type {
	FilterOption,
	SubjectAvailability,
	SubjectTrack,
} from "../../../../types/types";
import SubjectFiltersControls from "../molecules/SubjectFiltersControls";
import SubjectFiltersFooter from "../molecules/SubjectFiltersFooter";
import SubjectSearchInput from "../molecules/SubjectSearchInput";

export type SubjectsCatalogFiltersProps = {
	search: string;
	track: "all" | SubjectTrack;
	availability: "all" | SubjectAvailability;
	trackOptions: FilterOption<"all" | SubjectTrack>[];
	availabilityOptions: FilterOption<"all" | SubjectAvailability>[];
	resultCount: number;
	hasActiveFilters: boolean;
	onSearchChange: (value: string) => void;
	onTrackChange: (value: "all" | SubjectTrack) => void;
	onAvailabilityChange: (value: "all" | SubjectAvailability) => void;
	onReset: () => void;
};

export function SubjectsCatalogFilters({
	search,
	track,
	availability,
	trackOptions,
	availabilityOptions,
	resultCount,
	hasActiveFilters,
	onSearchChange,
	onTrackChange,
	onAvailabilityChange,
	onReset,
}: SubjectsCatalogFiltersProps) {
	return (
		<section className="rounded-3xl border border-(--border) bg-(--bg-card) p-5 shadow-sm">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<SubjectSearchInput
					search={search}
					onSearchChange={onSearchChange}
				/>

				<SubjectFiltersControls
					track={track}
					availability={availability}
					onTrackChange={onTrackChange}
					onAvailabilityChange={onAvailabilityChange}
					trackOptions={trackOptions}
					availabilityOptions={availabilityOptions}
				/>
			</div>

			<SubjectFiltersFooter
				resultCount={resultCount}
				hasActiveFilters={hasActiveFilters}
				onReset={onReset}
			/>
		</section>
	);
}
