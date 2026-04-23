// pages/SubjectsPage.jsx
import { useState, useMemo } from "react";
import {
	CATEGORY_META,
	Subject,
	SUBJECTS,
} from "../../../features/subjects/data/subjects.data";
import SubjectCard from "../../../features/subjects/data/SubjectCard";
import SubjectsFilter from "./SubjectsFilter";
import SubjectsStats from "./SubjectsStats";

// ── pure helpers (în afara componentei, nu se recreează la fiecare render) ────

function buildCategories() {
	return Object.entries(CATEGORY_META).map(([id, meta]) => ({ id, ...meta }));
}

type FilterOptions = {
	category: string;
	difficulty: string;
	search: string;
};

function applyFilters(
	subjects: Subject[],
	{ category, difficulty, search }: FilterOptions,
) {
	const q = search.trim().toLowerCase();
	return subjects.filter((s) => {
		if (category !== "all" && s.category !== category) return false;
		if (difficulty !== "all" && s.difficulty !== difficulty) return false;
		if (q) {
			const hit =
				s.title.toLowerCase().includes(q) ||
				s.description.toLowerCase().includes(q) ||
				s.tags.some((t) => t.toLowerCase().includes(q));
			if (!hit) return false;
		}
		return true;
	});
}

// Grupează subjects filtrate după categorie păstrând ordinea din CATEGORY_META
function groupByCategory(subjects: Subject[]): [string, Subject[]][] {
	const map = new Map<string, Subject[]>(
		Object.keys(CATEGORY_META).map((k) => [k, []]),
	);
	subjects.forEach((s) => map.get(s.category)?.push(s));
	// Elimină categoriile goale
	return [...map.entries()].filter(([, items]) => items.length > 0);
}

// ── SubjectsPage ──────────────────────────────────────────────────────────────
export default function SubjectsPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [activeDiff, setActiveDiff] = useState("all");
	const [search, setSearch] = useState("");

	const categories = buildCategories();

	const filtered = useMemo(
		() =>
			applyFilters(SUBJECTS, {
				category: activeCategory,
				difficulty: activeDiff,
				search,
			}),
		[activeCategory, activeDiff, search],
	);

	const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

	const isFiltering =
		activeCategory !== "all" || activeDiff !== "all" || search.trim() !== "";

	function resetFilters() {
		setActiveCategory("all");
		setActiveDiff("all");
		setSearch("");
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
			<div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* ── Header ──────────────────────────────────────────────────── */}
				<header className="mb-6">
					<nav
						aria-label="Breadcrumb"
						className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-3"
					>
						<span>LearnNoir</span>
						<svg
							className="w-3 h-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<span className="text-gray-600 dark:text-gray-300 font-medium">
							Subjects
						</span>
					</nav>

					<div className="flex items-end justify-between gap-4 flex-wrap">
						<div>
							<h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100 tracking-tight">
								Computer Science
							</h1>
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
								{SUBJECTS.length} subjects · {Object.keys(CATEGORY_META).length}{" "}
								categories
							</p>
						</div>
					</div>
				</header>

				{/* ── Stats ───────────────────────────────────────────────────── */}
				<div className="mb-5">
					<SubjectsStats subjects={SUBJECTS} />
				</div>

				{/* ── Filters ─────────────────────────────────────────────────── */}
				<div className="mb-5">
					<SubjectsFilter
						categories={categories}
						activeCategory={activeCategory}
						activeDiff={activeDiff}
						search={search}
						onCategory={setActiveCategory}
						onDiff={setActiveDiff}
						onSearch={setSearch}
					/>
				</div>

				{/* ── Filter result summary ────────────────────────────────────── */}
				{isFiltering && (
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs text-gray-400 dark:text-gray-500">
							{filtered.length > 0 ? (
								<>
									{filtered.length} result{filtered.length !== 1 ? "s" : ""}
									{search && (
										<>
											{" "}
											for{" "}
											<em className="not-italic text-gray-600 dark:text-gray-300">
												"{search}"
											</em>
										</>
									)}
								</>
							) : (
								"No results"
							)}
						</p>
						<button
							onClick={resetFilters}
							className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2 transition-colors"
						>
							Reset filters
						</button>
					</div>
				)}

				{/* ── Content ─────────────────────────────────────────────────── */}
				{filtered.length > 0 ? (
					<div className="flex flex-col gap-10">
						{grouped.map(([categoryId, items]) => {
							const meta = CATEGORY_META[categoryId];
							return (
								<section
									key={categoryId}
									aria-labelledby={`section-${categoryId}`}
								>
									{/* Section label */}
									<div className="flex items-center gap-3 mb-4">
										<h2
											id={`section-${categoryId}`}
											className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
										>
											{meta.label}
										</h2>
										<span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
											{items.length} subject{items.length !== 1 ? "s" : ""}
										</span>
										<div
											className="flex-1 h-px bg-gray-200 dark:bg-gray-800"
											aria-hidden="true"
										/>
										<p className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
											{meta.description}
										</p>
									</div>

									{/* Cards grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
										{items.map((subject) => (
											<SubjectCard
												key={subject.id}
												subject={subject}
												categoryMeta={meta}
											/>
										))}
									</div>
								</section>
							);
						})}
					</div>
				) : (
					/* ── Empty state ─────────────────────────────────────────────── */
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</div>
						<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							No subjects found
						</p>
						<p className="text-xs text-gray-400 dark:text-gray-500 mb-5 max-w-xs">
							Try a different search term or clear your filters.
						</p>
						<button
							onClick={resetFilters}
							className={[
								"text-xs px-4 py-2 rounded-lg",
								"border border-gray-200 dark:border-gray-800",
								"text-gray-600 dark:text-gray-400",
								"hover:bg-gray-100 dark:hover:bg-gray-800",
								"transition-colors duration-150",
							].join(" ")}
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
