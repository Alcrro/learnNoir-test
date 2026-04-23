import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	Atom,
	Binary,
	Calculator,
	CircleDashed,
	Dna,
	FlaskConical,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
	getAvailabilityCopy,
	getSubjectProgress,
	getTrackCopy,
} from "../../../libs/utils/subjectsCatalog.utils";
import type { SubjectAccent, SubjectDomain } from "../../../types/types";

const ACCENT_STYLES: Record<
	SubjectAccent,
	{
		badge: string;
		icon: string;
		progress: string;
		ring: string;
		topic: string;
	}
> = {
	indigo: {
		badge: "border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
		icon: "bg-[var(--blue-bg)] text-[var(--blue-text)]",
		progress: "bg-[var(--blue)]",
		ring: "hover:border-[color:var(--blue-border)] focus-visible:ring-[var(--blue-bg)]",
		topic:
			"border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
	},
	cyan: {
		badge: "border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
		icon: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
		progress: "bg-[var(--teal)]",
		ring: "hover:border-[color:var(--teal-border)] focus-visible:ring-[var(--teal-bg)]",
		topic:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
	},
	emerald: {
		badge: "border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
		icon: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
		progress: "bg-[var(--teal)]",
		ring: "hover:border-[color:var(--teal-border)] focus-visible:ring-[var(--teal-bg)]",
		topic:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
	},
	amber: {
		badge: "border-amber-200 bg-amber-50 text-[var(--amber-text)] dark:border-amber-500/30 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
		icon: "bg-amber-100 text-amber-700 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
		progress: "bg-amber-500 dark:bg-amber-400",
		ring: "hover:border-amber-300 dark:hover:border-amber-400/40 focus-visible:ring-amber-100 dark:focus-visible:ring-[var(--amber-bg)]",
		topic:
			"border-amber-200 bg-amber-50 text-[var(--amber-text)] dark:border-amber-500/30 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
	},
	rose: {
		badge: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/12 dark:text-rose-300",
		icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
		progress: "bg-rose-500 dark:bg-rose-400",
		ring: "hover:border-rose-300 dark:hover:border-rose-400/40 focus-visible:ring-rose-100 dark:focus-visible:ring-rose-500/20",
		topic:
			"border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/12 dark:text-rose-300",
	},
	violet: {
		badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/12 dark:text-violet-300",
		icon: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
		progress: "bg-violet-500 dark:bg-violet-400",
		ring: "hover:border-violet-300 dark:hover:border-violet-400/40 focus-visible:ring-violet-100 dark:focus-visible:ring-violet-500/20",
		topic:
			"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/12 dark:text-violet-300",
	},
};

const SUBJECT_ICONS: Record<string, LucideIcon> = {
	"computer-science": Binary,
	mathematics: Calculator,
	physics: Atom,
	chemistry: FlaskConical,
	biology: Dna,
	statistics: CircleDashed,
};

type SubjectOverviewCardProps = {
	subject: SubjectDomain;
};

export function SubjectOverviewCard({ subject }: SubjectOverviewCardProps) {
	const progress = getSubjectProgress(subject);
	const accent = ACCENT_STYLES[subject.accent];
	const Icon = SUBJECT_ICONS[subject.id] ?? CircleDashed;
	const statusCopy = getAvailabilityCopy(subject.availability);
	const isAvailable = subject.availability === "available" && subject.href;

	const content = (
		<>
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-start gap-3">
					<div
						className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.icon}`}
					>
						<Icon className="h-5 w-5" />
					</div>

					<div>
						<div className="flex flex-wrap items-center gap-2">
							<p className="text-lg font-semibold text-[var(--text-primary)]">
								{subject.title}
							</p>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${accent.badge}`}
							>
								{statusCopy}
							</span>
						</div>

						<p className="mt-1 text-sm text-[var(--text-secondary)]">
							{subject.subtitle}
						</p>
					</div>
				</div>

				{isAvailable ? (
					<div className="hidden rounded-full border border-[color:var(--border)] p-2 text-[var(--text-muted)] transition group-hover:border-[color:var(--border-strong)] group-hover:text-[var(--text-primary)] sm:block">
						<ArrowRight className="h-4 w-4" />
					</div>
				) : null}
			</div>

			<p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
				{subject.description}
			</p>

			<div className="mt-5 grid grid-cols-3 gap-3">
				<Stat
					label="Modules"
					value={subject.modules}
				/>
				<Stat
					label="Lessons"
					value={subject.lessons}
				/>
				<Stat
					label="Hours"
					value={`~${subject.estimatedHours}h`}
				/>
			</div>

			<div className="mt-5">
				<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
					<span>{getTrackCopy(subject.track)}</span>
					<span>
						{subject.completedModules}/{subject.modules} modules completed
					</span>
				</div>

				<div
					className="h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]"
					role="progressbar"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={`${subject.title} progress ${progress}%`}
				>
					<div
						className={`h-full rounded-full transition-all duration-500 ${accent.progress}`}
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<div className="mt-5 flex flex-wrap gap-2">
				{subject.topics.map((topic) => (
					<span
						key={topic}
						className={`rounded-full border px-3 py-1 text-xs ${accent.topic}`}
					>
						{topic}
					</span>
				))}
			</div>

			<div className="mt-6 flex items-center justify-between border-t border-[color:var(--border)] pt-4">
				<p className="text-sm text-[var(--text-secondary)]">
					{isAvailable
						? "Open subject page and continue learning."
						: "Visible in the roadmap until content is ready."}
				</p>

				<span className="text-sm font-medium text-[var(--text-primary)]">
					{isAvailable ? "Explore" : "Planned"}
				</span>
			</div>
		</>
	);

	const cardClassName = [
		"group flex h-full flex-col rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm transition duration-200",
		accent.ring,
	].join(" ");

	if (isAvailable && subject.href) {
		return (
			<Link
				to={subject.href}
				className={`${cardClassName} focus-visible:outline-none focus-visible:ring-4`}
			>
				{content}
			</Link>
		);
	}

	return <div className={`${cardClassName} opacity-95`}>{content}</div>;
}

type StatProps = {
	label: string;
	value: number | string;
};

function Stat({ label, value }: StatProps) {
	return (
		<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
			<p className="text-sm font-semibold text-[var(--text-primary)]">{value}</p>
			<p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
				{label}
			</p>
		</div>
	);
}
