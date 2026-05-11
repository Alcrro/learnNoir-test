// components/SubjectsFilter.jsx

import ChipBtn from "../atoms/SubjectChipBtn";
import SubjectSearchButn from "../atoms/SubjectSearchButn";
import SubjectInput from "../molecules/SubjectInput";
import SubjectSelectDifficulty from "../molecules/SubjectSelectDifficulty";

// ── SubjectsFilter ────────────────────────────────────────────────────────────
// Props:
//   categories     — [{ id, label }] din CATEGORY_META
//   activeCategory — string
//   activeDiff     — string
//   search         — string
//   onCategory     — fn(id)
//   onDiff         — fn(diff)
//   onSearch       — fn(query)

type SubjectsFilterProps = {
	categories: { id: string; label: string }[];
	activeCategory: string;
	activeDiff: string;
	search: string;
	onCategory: (id: string) => void;
	onDiff: (diff: string) => void;
	onSearch: (query: string) => void;
};

export default function SubjectsFilter({
	categories,
	activeCategory,
	activeDiff,
	search,
	onCategory,
	onDiff,
	onSearch,
}: SubjectsFilterProps) {
	return (
		<div className="flex flex-col gap-3">
			{/* Search input */}
			<div className="relative max-w-sm">
				<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
					<svg
						className="w-3.5 h-3.5 text-(--text-secondary)"
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
				<SubjectInput
					search={search}
					onSearch={onSearch}
				/>
				{search && <SubjectSearchButn onSearch={onSearch} />}
			</div>

			{/* Category tabs + difficulty */}
			<div className="flex items-center justify-between gap-3 flex-wrap">
				{/* Category pills */}
				<div
					role="tablist"
					aria-label="Filter by category"
					className="flex items-center gap-1.5 flex-wrap"
				>
					<ChipBtn
						active={activeCategory === "all"}
						onClick={() => onCategory("all")}
					>
						All
					</ChipBtn>
					{categories.map((cat) => (
						<ChipBtn
							key={cat.id}
							active={activeCategory === cat.id}
							onClick={() => onCategory(cat.id)}
						>
							{cat.label}
						</ChipBtn>
					))}
				</div>

				{/* Difficulty select */}
				<SubjectSelectDifficulty
					activeDiff={activeDiff}
					onDiff={onDiff}
				/>
			</div>
		</div>
	);
}
