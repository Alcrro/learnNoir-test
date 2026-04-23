// components/SubjectsFilter.jsx

const DIFFICULTIES = [
	{ value: "all", label: "All levels" },
	{ value: "beginner", label: "Beginner" },
	{ value: "intermediate", label: "Intermediate" },
	{ value: "advanced", label: "Advanced" },
];

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
						className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
					type="search"
					value={search}
					onChange={(e) => onSearch(e.target.value)}
					placeholder="Search subjects or tags..."
					className={[
						"w-full h-9 pl-9 pr-8 text-xs",
						"bg-white dark:bg-gray-900",
						"border border-gray-200 dark:border-gray-800",
						"rounded-lg text-gray-900 dark:text-gray-100",
						"placeholder:text-gray-400 dark:placeholder:text-gray-600",
						"focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-600",
						"transition-colors duration-150",
					].join(" ")}
				/>
				{search && (
					<button
						onClick={() => onSearch("")}
						aria-label="Clear search"
						className="absolute inset-y-0 right-2.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
					>
						<svg
							className="w-3 h-3"
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
				)}
			</div>

			{/* Category tabs + difficulty */}
			<div className="flex items-center justify-between gap-3 flex-wrap">
				{/* Category pills */}
				<div
					role="tablist"
					aria-label="Filter by category"
					className="flex items-center gap-1.5 flex-wrap"
				>
					<Chip
						active={activeCategory === "all"}
						onClick={() => onCategory("all")}
					>
						All
					</Chip>
					{categories.map((cat) => (
						<Chip
							key={cat.id}
							active={activeCategory === cat.id}
							onClick={() => onCategory(cat.id)}
						>
							{cat.label}
						</Chip>
					))}
				</div>

				{/* Difficulty select */}
				<select
					value={activeDiff}
					onChange={(e) => onDiff(e.target.value)}
					aria-label="Filter by difficulty"
					className={[
						"h-8 px-3 text-xs",
						"bg-white dark:bg-gray-900",
						"border border-gray-200 dark:border-gray-800",
						"rounded-lg text-gray-600 dark:text-gray-400",
						"focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
						"cursor-pointer",
					].join(" ")}
				>
					{DIFFICULTIES.map((d) => (
						<option
							key={d.value}
							value={d.value}
						>
							{d.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

type ChipProps = {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
};
// ── Chip ──────────────────────────────────────────────────────────────────────
function Chip({ active, onClick, children }: ChipProps) {
	return (
		<button
			role="tab"
			aria-selected={active}
			onClick={onClick}
			className={[
				"h-8 px-3 text-xs font-medium rounded-full",
				"transition-all duration-150",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
				active
					? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
					: [
							"text-gray-500 dark:text-gray-400",
							"border border-gray-200 dark:border-gray-800",
							"hover:text-gray-700 dark:hover:text-gray-200",
							"hover:border-gray-300 dark:hover:border-gray-700",
						].join(" "),
			].join(" ")}
		>
			{children}
		</button>
	);
}
