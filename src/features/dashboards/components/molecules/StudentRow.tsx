import type { TeacherStudentDTO } from "../../types/teacher.types";
import { DashboardProgressBar } from "../DashboardUI";

type Props = { student: TeacherStudentDTO };

export function StudentRow({ student }: Props) {
	const completionRate =
		student.lessonsTotal > 0
			? Math.round((student.lessonsCompleted / student.lessonsTotal) * 100)
			: 0;

	const progressTone =
		completionRate >= 70 ? "teal" : completionRate >= 40 ? "amber" : "rose";

	const lastSeen = student.lastActivityAt
		? new Date(student.lastActivityAt).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
			})
		: "—";

	const initials = student.username
		.split(/\s+/)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<tr className="bg-[var(--bg-secondary)] text-sm">
			<td className="rounded-l-3xl px-4 py-4">
				<div className="flex items-center gap-3">
					{student.avatarUrl ? (
						<img
							src={student.avatarUrl}
							alt={student.username}
							className="h-8 w-8 shrink-0 rounded-full object-cover"
						/>
					) : (
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--blue-bg)] text-xs font-semibold text-[var(--blue-text)]">
							{initials}
						</div>
					)}
					<p className="font-semibold text-[var(--text-primary)]">{student.username}</p>
				</div>
			</td>
			<td className="px-4 py-4 text-[var(--text-secondary)]">
				{student.lessonsCompleted}/{student.lessonsTotal}
			</td>
			<td className="px-4 py-4">
				<div className="min-w-[8rem]">
					<div className="mb-1.5 text-xs text-[var(--text-secondary)]">{completionRate}%</div>
					<DashboardProgressBar value={completionRate} tone={progressTone} />
				</div>
			</td>
			<td className="px-4 py-4">
				<span className="text-sm font-semibold text-[var(--text-primary)]">
					{student.avgScore > 0 ? student.avgScore.toFixed(1) : "—"}
				</span>
			</td>
			<td className="rounded-r-3xl px-4 py-4 text-[var(--text-secondary)]">{lastSeen}</td>
		</tr>
	);
}
