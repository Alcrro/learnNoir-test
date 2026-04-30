import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { MODULES } from "../data/modules.data";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";

const difficultyColors = {
	beginner:
		"bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
	intermediate:
		"bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
	advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

const difficultyLabels = {
	beginner: "Beginner",
	intermediate: "Intermediate",
	advanced: "Advanced",
};

function ModuleCard({ module }: { module: (typeof MODULES)[number] }) {
	const progress =
		module.totalLessons > 0
			? Math.round((module.completedLessons / module.totalLessons) * 100)
			: 0;

	return (
		<Link
			to={`/subjects/computer-science/${module.id}`}
			className="group block rounded-xl border border-(--border) bg-(--surface) p-5 transition-all hover:border-(--border-strong) hover:shadow-lg"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h3 className="text-lg font-semibold text-(--text-primary)">
							{module.title}
						</h3>
						<span
							className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${difficultyColors[module.difficulty]}`}
						>
							{difficultyLabels[module.difficulty]}
						</span>
					</div>
					<p className="mt-2 text-sm text-(--text-secondary) line-clamp-2">
						{module.description}
					</p>
				</div>
				<div className="hidden rounded-full border border-(--border) p-2 text-(--text-muted) transition group-hover:border-(--border-strong) group-hover:text-(--text-primary) sm:block">
					<ArrowRight className="h-4 w-4" />
				</div>
			</div>

			<div className="mt-4 flex items-center gap-4 text-sm text-(--text-muted)">
				<div className="flex items-center gap-1.5">
					<BookOpen className="h-4 w-4" />
					<span>
						{module.completedLessons}/{module.totalLessons} lessons
					</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Clock className="h-4 w-4" />
					<span>~{module.estimatedHours}h</span>
				</div>
			</div>

			<div className="mt-4">
				<div className="flex items-center justify-between text-xs text-(--text-muted) mb-1.5">
					<span>Progress</span>
					<span>{progress}%</span>
				</div>
				<div className="h-1.5 rounded-full bg-(--border) overflow-hidden">
					<div
						className="h-full rounded-full bg-(--accent-primary) transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				{module.tags.slice(0, 3).map((tag) => (
					<span
						key={tag}
						className="rounded-full border border-(--border) px-2.5 py-1 text-xs text-(--text-secondary)"
					>
						{tag}
					</span>
				))}
			</div>
		</Link>
	);
}

const ModulesListPage = () => {
	const completedModules = MODULES.filter(
		(m) => m.completedLessons === m.totalLessons,
	).length;
	const totalLessons = MODULES.reduce((acc, m) => acc + m.totalLessons, 0);
	const completedLessons = MODULES.reduce(
		(acc, m) => acc + m.completedLessons,
		0,
	);

	return (
		<div className="py-2">
			<Breadcrumb />

			<div className="mt-6">
				<div className="flex items-center gap-2">
					<GraduationCap className="h-6 w-6 text-(--accent-primary)" />
					<h1 className="text-2xl font-bold text-(--text-primary)">Modules</h1>
				</div>
				<p className="mt-2 text-(--text-secondary)">
					Explore all available modules to strengthen your computer science
					fundamentals.
				</p>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{MODULES.map((module) => (
					<ModuleCard
						key={module.id}
						module={module}
					/>
				))}
			</div>

			<div className="mt-8 rounded-xl border border-(--border) bg-(--surface) p-5">
				<h2 className="text-lg font-semibold text-(--text-primary)">
					Overall Progress
				</h2>
				<div className="mt-4 grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-2xl font-bold text-(--accent-primary)">
							{MODULES.length}
						</div>
						<div className="text-sm text-(--text-muted)">Total Modules</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-(--accent-primary)">
							{completedModules}
						</div>
						<div className="text-sm text-(--text-muted)">Completed</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-(--accent-primary)">
							{completedLessons}/{totalLessons}
						</div>
						<div className="text-sm text-(--text-muted)">Lessons</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModulesListPage;
