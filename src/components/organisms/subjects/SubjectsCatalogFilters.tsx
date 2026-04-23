import type {
	FilterOption,
	SubjectAvailability,
	SubjectTrack,
} from "../../../types/types";

type SubjectsCatalogFiltersProps = {
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
		<section className="rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div className="flex-1">
					<label
						htmlFor="subjects-search"
						className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]"
					>
						Search subjects
					</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--text-muted)]">
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</div>

						<input
							id="subjects-search"
							type="search"
							value={search}
							onChange={(event) => onSearchChange(event.target.value)}
							placeholder="Computer Science, Physics, Algebra..."
							className="h-12 w-full rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] pl-11 pr-10 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[color:var(--blue-border)] focus:bg-[var(--bg-card)] focus:ring-2 focus:ring-[var(--blue-bg)]"
						/>

						{search ? (
							<button
								type="button"
								onClick={() => onSearchChange("")}
								className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
								aria-label="Clear search"
							>
								<svg
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						) : null}
					</div>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<div>
						<label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
							Track
						</label>
						<select
							value={track}
							onChange={(event) =>
								onTrackChange(event.target.value as "all" | SubjectTrack)
							}
							className="h-12 min-w-[170px] rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[color:var(--blue-border)] focus:bg-[var(--bg-card)] focus:ring-2 focus:ring-[var(--blue-bg)]"
						>
							{trackOptions.map((option) => (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
							Status
						</label>
						<select
							value={availability}
							onChange={(event) =>
								onAvailabilityChange(event.target.value as "all" | SubjectAvailability)
							}
							className="h-12 min-w-[170px] rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[color:var(--blue-border)] focus:bg-[var(--bg-card)] focus:ring-2 focus:ring-[var(--blue-bg)]"
						>
							{availabilityOptions.map((option) => (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="mt-4 flex flex-col gap-3 border-t border-[color:var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-[var(--text-secondary)]">
					<span className="font-semibold text-[var(--text-primary)]">{resultCount}</span>{" "}
					subjects match the current filters.
				</p>

				{hasActiveFilters ? (
					<button
						type="button"
						onClick={onReset}
						className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
					>
						Reset filters
					</button>
				) : null}
			</div>
		</section>
	);
}
