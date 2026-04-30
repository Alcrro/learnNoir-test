import React from "react";
import { DefaultSelect } from "../../atoms/DefaultSelect";
import {
	SubjectTrack,
	SubjectAvailability,
	FilterOption,
} from "../../../types/types";

type SubjectFiltersCOntrolsProps = {
	track: "all" | SubjectTrack;
	availability: "all" | SubjectAvailability;
	trackOptions: FilterOption<"all" | SubjectTrack>[];
	availabilityOptions: FilterOption<"all" | SubjectAvailability>[];
	onTrackChange: (value: "all" | SubjectTrack) => void;
	onAvailabilityChange: (value: "all" | SubjectAvailability) => void;
};
const SubjectFiltersControls = ({
	track,
	onTrackChange,
	trackOptions,
	availability,
	onAvailabilityChange,
	availabilityOptions,
}: SubjectFiltersCOntrolsProps) => {
	return (
		<div className="flex flex-col gap-3 sm:flex-row">
			<div>
				<label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-(--text-muted)">
					Track
				</label>

				<DefaultSelect
					value={track}
					onChange={(event) => onTrackChange(event)}
					options={trackOptions}
					className="h-12 min-w-42.5 rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 pr-8 text-sm text-(--text-primary) outline-none transition focus:border-(--blue-border) focus:bg-(--bg-card) focus:ring-2 focus:ring-(--blue-bg)"
				/>
			</div>

			<div>
				<label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-(--text-muted)">
					Status
				</label>

				<DefaultSelect
					value={availability}
					onChange={(event) => onAvailabilityChange(event)}
					options={availabilityOptions}
					className="h-12 min-w-42.5 rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 text-sm text-(--text-primary) outline-none transition focus:border-(--blue-border) focus:bg-(--bg-card) focus:ring-2 focus:ring-(--blue-bg)"
				/>
			</div>
		</div>
	);
};

export default SubjectFiltersControls;
