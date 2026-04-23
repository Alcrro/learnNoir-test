// components/SubjectCard.jsx
import type { KeyboardEvent, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import type { Subject } from "./subjects.data";

// ── Tailwind color map per categorie ─────────────────────────────────────────
// IMPORTANT: clasele Tailwind trebuie să fie complete în cod (nu construite dinamic)
// altfel Tailwind purge le elimină în build de producție.
const COLOR_MAP = {
	indigo: {
		icon: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
		tag: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60",
		progress: "bg-indigo-500 dark:bg-indigo-400",
		stripe: "bg-indigo-500",
		ring: "focus-visible:ring-indigo-500",
	},
	blue: {
		icon: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
		tag: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60",
		progress: "bg-blue-500 dark:bg-blue-400",
		stripe: "bg-blue-500",
		ring: "focus-visible:ring-blue-500",
	},
	violet: {
		icon: "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
		tag: "bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60",
		progress: "bg-violet-500 dark:bg-violet-400",
		stripe: "bg-violet-500",
		ring: "focus-visible:ring-violet-500",
	},
	slate: {
		icon: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
		tag: "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60",
		progress: "bg-slate-500 dark:bg-slate-400",
		stripe: "bg-slate-500",
		ring: "focus-visible:ring-slate-500",
	},
	cyan: {
		icon: "bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400",
		tag: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60",
		progress: "bg-cyan-500 dark:bg-cyan-400",
		stripe: "bg-cyan-500",
		ring: "focus-visible:ring-cyan-500",
	},
	emerald: {
		icon: "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
		tag: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
		progress: "bg-emerald-500 dark:bg-emerald-400",
		stripe: "bg-emerald-500",
		ring: "focus-visible:ring-emerald-500",
	},
	amber: {
		icon: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
		tag: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
		progress: "bg-amber-500 dark:bg-amber-400",
		stripe: "bg-amber-500",
		ring: "focus-visible:ring-amber-500",
	},
};

const DIFFICULTY = {
	beginner: {
		label: "Beginner",
		cls: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
	},
	intermediate: {
		label: "Intermediate",
		cls: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
	},
	advanced: {
		label: "Advanced",
		cls: "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200/60 dark:border-red-800/60",
	},
};

// ── SVG icons (inline, fără dependențe externe) ───────────────────────────────
const ICONS: Record<string, ReactElement> = {
	layers: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>,
	cpu: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>,
	tree: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>,
	server: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 18.91a2.25 2.25 0 01-1.07-1.916V17.25m19.5-9.75v.75a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V7.5" /></svg>,
	globe: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
	database: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
	function: <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.255 3A23.933 23.933 0 0121 12c0 3.183-.62 6.22-1.745 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" /></svg>,
};

type CategoryMeta = {
	label: string;
	description: string;
	color: string;
	icon: string;
};

type SubjectCardProps = {
	subject: Subject;
	categoryMeta: CategoryMeta;
};

// ── Status helpers ────────────────────────────────────────────────────────────
function getStatus(completed: number, total: number) {
	if (completed === 0) {
		return {
			label: "Not started",
			cls: "text-gray-400 dark:text-gray-500",
		};
	}

	if (completed === total) {
		return {
			label: "Completed",
			cls: "text-emerald-600 dark:text-emerald-400",
		};
	}

	return {
		label: "In progress",
		cls: "text-blue-600 dark:text-blue-400",
	};
}

// ── SubjectCard ───────────────────────────────────────────────────────────────
export default function SubjectCard({
	subject,
	categoryMeta,
}: SubjectCardProps) {
	const navigate = useNavigate();

	const c = COLOR_MAP[categoryMeta.color as keyof typeof COLOR_MAP] ?? COLOR_MAP.indigo;
	const diff = DIFFICULTY[subject.difficulty];
	const pct =
		subject.totalLessons > 0
			? Math.round((subject.completedLessons / subject.totalLessons) * 100)
			: 0;
	const status = getStatus(subject.completedLessons, subject.totalLessons);
	const icon = ICONS[categoryMeta.icon] ?? ICONS.layers;

	function handleClick() {
		navigate(`/subjects/${subject.id}`);
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
				"bg-white dark:bg-gray-900",
				"border border-gray-200 dark:border-gray-800",
				"rounded-xl overflow-hidden",
				"cursor-pointer outline-none select-none",
				"transition-all duration-200 ease-out",
				"hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30",
				"hover:-translate-y-0.5",
				"hover:border-gray-300 dark:hover:border-gray-700",
				`focus-visible:ring-2 focus-visible:ring-offset-2 ${c.ring}`,
			].join(" ")}
		>
			{/* Color stripe top */}
			<div className={`h-0.5 w-full ${c.stripe} opacity-70`} />

			{/* Popular badge */}
			{subject.featured && (
				<div className="absolute top-3 right-3 z-10">
					<span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 tracking-wide">
						Popular
					</span>
				</div>
			)}

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Icon + title */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${c.icon}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight truncate">
              {subject.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${diff.cls}`}>
                {diff.label}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                ~{subject.estimatedHours}h
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {subject.description}
        </p>

        {/* Tags — max 3 afișate */}
        <div className="flex flex-wrap gap-1">
          {subject.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${c.tag}`}>
              {tag}
            </span>
          ))}
          {subject.tags.length > 3 && (
            <span className="text-[10px] text-gray-400 dark:text-gray-500 px-1 py-0.5">
              +{subject.tags.length - 3}
            </span>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-[11px] font-medium ${status.cls}`}>
            {status.label}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {subject.completedLessons}/{subject.totalLessons} lessons
          </span>
        </div>
        <div
          className="h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
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
