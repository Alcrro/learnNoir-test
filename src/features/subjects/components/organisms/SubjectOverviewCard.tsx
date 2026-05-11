import { ArrowRight, CircleDashed } from "lucide-react";
import { Link } from "react-router-dom";
import type { SubjectDomain } from "../../../../types/types";
import { ACCENT_STYLES } from "../../data/subjectAccestMapper";
import { SUBJECT_ICONS } from "../../data/SubjectIconCardMapper";
import SubjectOverviewStat from "../molecules/SubjectOverviewStat";
import { cardClassName } from "../../data/subjectCardClassname";
import { getSubjectProgress } from "../../utils/getSubjectProgress";
import { getAvailabilityCopy } from "../../utils/getAvailabilityCopy";
import SubjectProgressBar from "../molecules/SubjectProgressBar";
import SubjectTrackName from "../molecules/SubjectTrackName";
import SubjectProgressModulesCounter from "../molecules/SubjectProgressModulesCounter";

type SubjectOverviewCardProps = {
	subject: SubjectDomain;
};

export function SubjectOverviewCard({ subject }: SubjectOverviewCardProps) {
	const progress = getSubjectProgress(subject);
	const accent = ACCENT_STYLES[subject.accent];
	const Icon = SUBJECT_ICONS[subject.id] ?? CircleDashed;
	const statusCopy = getAvailabilityCopy(subject.availability);
	const isAvailable = subject.availability === "available" && subject.href;

	const modulesCompleted = subject.completedModules;
	const totalModules = subject.modules;

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
							<p className="text-lg font-semibold text-(--text-primary)">
								{subject.title}
							</p>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${accent.badge}`}
							>
								{statusCopy}
							</span>
						</div>

						<p className="mt-1 text-sm text-(--text-secondary)">{subject.subtitle}</p>
					</div>
				</div>

				{isAvailable ? (
					<div className="hidden rounded-full border border-(--border) p-2 text-(--text-muted) transition group-hover:border-(--border-strong) group-hover:text-(--text-primary) sm:block">
						<ArrowRight className="h-4 w-4" />
					</div>
				) : null}
			</div>

			<p className="mt-4 text-sm leading-6 text-(--text-secondary)">
				{subject.description}
			</p>

			<div className="mt-5 grid grid-cols-3 gap-3">
				<SubjectOverviewStat
					label="Modules"
					value={subject.modules}
				/>
				<SubjectOverviewStat
					label="Lessons"
					value={subject.lessons}
				/>
				<SubjectOverviewStat
					label="Hours"
					value={`~${subject.estimatedHours}h`}
				/>
			</div>

			<div className="mt-5">
				<div className="mb-2 flex items-center justify-between text-xs text-(--text-secondary)">
					<SubjectTrackName track={subject.track} />
					<SubjectProgressModulesCounter
						completed={modulesCompleted}
						total={totalModules}
					/>
				</div>

				<SubjectProgressBar
					progress={progress}
					accent={accent}
					ariaLabel={""}
				/>
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

			<div className="mt-6 flex items-center justify-between border-t border-(--border) pt-4">
				<p className="text-sm text-(--text-secondary)">
					{isAvailable
						? "Open subject page and continue learning."
						: "Visible in the roadmap until content is ready."}
				</p>

				<span className="text-sm font-medium text-(--text-primary)">
					{isAvailable ? "Explore" : "Planned"}
				</span>
			</div>
		</>
	);

	if (isAvailable && subject.href) {
		return (
			<Link
				to={subject.href}
				className={`${cardClassName(accent.ring)} focus-visible:outline-none focus-visible:ring-4`}
			>
				{content}
			</Link>
		);
	}

	return (
		<div className={`${cardClassName(accent.ring)} opacity-95`}>{content}</div>
	);
}
