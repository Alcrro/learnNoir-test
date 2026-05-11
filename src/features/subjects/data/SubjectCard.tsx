// components/SubjectCard.jsx
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Subject } from "./subjects.data";
import { COLOR_MAP, DIFFICULTY } from "./subjectsCard";
import { SUBJECT_ICONS_MAPPER } from "./subjectCardIconsMapper";
import { getSubjectStatus } from "../utils/getSubjectsStatus";
import SubjectIcon from "../components/SubjectIcon";
import PopularBadge from "../components/PopularBadge";

type CategoryMeta = {
	label: string;
	description: string;
	color: string;
	icon: string;
};

type SubjectCardProps = {
	subject: Subject;
	categoryMeta: CategoryMeta;
	navigateTo?: string;
};

// ── SubjectCard ───────────────────────────────────────────────────────────────
export default function SubjectCard({
	subject,
	categoryMeta,
	navigateTo,
}: SubjectCardProps) {
	const navigate = useNavigate();

	const c =
		COLOR_MAP[categoryMeta.color as keyof typeof COLOR_MAP] ?? COLOR_MAP.indigo;
	const diff = DIFFICULTY[subject.difficulty];
	const pct =
		subject.totalLessons > 0
			? Math.round((subject.completedLessons / subject.totalLessons) * 100)
			: 0;

	// ── Status helpers ────────────────────────────────────────────────────────────
	const { label, cls } = getSubjectStatus(
		subject.completedLessons,
		subject.totalLessons,
	);
	const icon =
		SUBJECT_ICONS_MAPPER[categoryMeta.icon] ?? SUBJECT_ICONS_MAPPER.layers;

	function handleClick() {
		navigate(navigateTo ?? `${categoryMeta.label.toLocaleLowerCase()}`);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	}

	return (
		<article
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={`${subject.title}, ${diff.label}, ${pct}% complet`}
			className={[
				"group relative flex flex-col",
				"bg-(--bg-card)",
				"border border-(--border-strong)",
				"rounded-xl overflow-hidden",
				"cursor-pointer outline-none select-none",
				"transition-all duration-200 ease-out",
				"hover:shadow-(--shadow-soft)",
				"hover:-translate-y-0.5",
				"border-(--border)",
				`focus-visible:ring-2 focus-visible:ring-offset-2 ${c.ring}`,
			].join(" ")}
		>
			{/* Color stripe top */}
			<div className={`h-0.5 w-full ${c.stripe} opacity-70`} />

			{/* Body */}
			<div className="flex flex-col flex-1 p-4 gap-3">
				{/* Icon + title */}
				<div className="flex items-start gap-3">
					<div className="flex flex-col justify-center items-center">
						<SubjectIcon
							icon={icon}
							cls={c.icon}
						/>
						{/* Popular badge */}
						{subject.featured && <PopularBadge />}
					</div>
					<div className="flex-1 min-w-0 pt-0.5">
						<h3 className="text-sm font-medium text-(--text-primary) leading-tight">
							{subject.title}
						</h3>
						<div className="flex items-center gap-2 mt-1.5">
							<span
								className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${diff.cls}`}
							>
								{diff.label}
							</span>
							<span className="text-[10px] text-(--text-secondary)">
								~{subject.estimatedHours}h
							</span>
						</div>
					</div>
				</div>

				{/* Description */}
				<p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 flex-1">
					{subject.description}
				</p>

				{/* Tags — max 3 afișate */}
				<div className="flex flex-wrap gap-1">
					{subject.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${c.tag}`}
						>
							{tag}
						</span>
					))}
					{subject.tags.length > 3 && (
						<span className="text-[10px] text-(--text-secondary) px-1 py-0.5">
							+{subject.tags.length - 3}
						</span>
					)}
				</div>
			</div>

			{/* Footer */}
			<div className="px-4 py-3 border-t border-(--border) dark:border-(--border)">
				<div className="flex items-center justify-between mb-1.5">
					<span className={`text-[11px] font-medium ${cls}`}>{label}</span>
					<span className="text-[11px] text-(--text-secondary)">
						{subject.completedLessons}/{subject.totalLessons} lessons
					</span>
				</div>
				<div
					className="h-1 rounded-full bg-(--bg-tertiary) overflow-hidden"
					role="progressbar"
					aria-valuenow={pct}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={`Progress: ${pct}%`}
				>
					<div
						className={`h-full rounded-full transition-all duration-700 ease-out ${c.progress}`}
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
		</article>
	);
}
