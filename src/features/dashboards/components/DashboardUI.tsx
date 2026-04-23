import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../../libs/utils/cn";
import type { DashboardTone, WorkspaceRole } from "../data/dashboardData";

const toneStyles: Record<
	DashboardTone,
	{ badge: string; icon: string; progress: string; soft: string }
> = {
	blue: {
		badge: "border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
		icon: "bg-[var(--blue-bg)] text-[var(--blue-text)]",
		progress: "bg-[var(--blue)]",
		soft: "bg-[var(--bg-secondary)]",
	},
	teal: {
		badge: "border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
		icon: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
		progress: "bg-[var(--teal)]",
		soft: "bg-[var(--bg-secondary)]",
	},
	amber: {
		badge: "border-transparent bg-[var(--amber-bg)] text-[var(--amber-text)]",
		icon: "bg-[var(--amber-bg)] text-[var(--amber-text)]",
		progress: "bg-[var(--yellow)]",
		soft: "bg-[var(--bg-secondary)]",
	},
	slate: {
		badge: "border-[color:var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
		icon: "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
		progress: "bg-[var(--text-primary)]",
		soft: "bg-[var(--bg-secondary)]",
	},
	rose: {
		badge: "border-transparent bg-[color:rgba(244,63,94,0.14)] text-[color:rgb(225,29,72)] dark:text-[color:rgb(251,113,133)]",
		icon: "bg-[color:rgba(244,63,94,0.12)] text-[color:rgb(225,29,72)] dark:text-[color:rgb(251,113,133)]",
		progress: "bg-[color:rgb(244,63,94)]",
		soft: "bg-[var(--bg-secondary)]",
	},
};

type PanelProps = {
	children: ReactNode;
	className?: string;
};

export function DashboardPanel({ children, className }: PanelProps) {
	return (
		<section
			className={cn(
				"rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm sm:p-6",
				className,
			)}
		>
			{children}
		</section>
	);
}

type SectionHeadingProps = {
	eyebrow?: string;
	title: string;
	description: string;
	action?: ReactNode;
};

export function DashboardSectionHeading({
	eyebrow,
	title,
	description,
	action,
}: SectionHeadingProps) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				{eyebrow ? (
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
						{eyebrow}
					</p>
				) : null}
				<h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
					{title}
				</h2>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
					{description}
				</p>
			</div>
			{action ? <div className="shrink-0">{action}</div> : null}
		</div>
	);
}

type StatCardProps = {
	label: string;
	value: string;
	helper: string;
	trend: string;
	icon: LucideIcon;
	tone?: DashboardTone;
};

export function DashboardStatCard({
	label,
	value,
	helper,
	trend,
	icon: Icon,
	tone = "blue",
}: StatCardProps) {
	const styles = toneStyles[tone];

	return (
		<DashboardPanel className="h-full p-5">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
					<p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
						{value}
					</p>
				</div>
				<div className={cn("rounded-2xl p-3", styles.icon)}>
					<Icon className="h-5 w-5" />
				</div>
			</div>
			<p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{helper}</p>
			<div className="mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.02em] text-[var(--text-primary)]">
				{trend}
			</div>
		</DashboardPanel>
	);
}

type BadgeProps = {
	label: string;
	tone?: DashboardTone;
	className?: string;
};

export function DashboardBadge({
	label,
	tone = "slate",
	className,
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.04em]",
				toneStyles[tone].badge,
				className,
			)}
		>
			{label}
		</span>
	);
}

type ProgressBarProps = {
	value: number;
	tone?: DashboardTone;
	className?: string;
};

export function DashboardProgressBar({
	value,
	tone = "blue",
	className,
}: ProgressBarProps) {
	return (
		<div
			className={cn(
				"h-2 overflow-hidden rounded-full bg-[var(--bg-secondary)]",
				className,
			)}
		>
			<div
				className={cn("h-full rounded-full transition-all", toneStyles[tone].progress)}
				style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
			/>
		</div>
	);
}

type RoleSwitchProps = {
	value: WorkspaceRole;
	onChange: (role: WorkspaceRole) => void;
};

export function DashboardRoleSwitch({ value, onChange }: RoleSwitchProps) {
	return (
		<div className="inline-flex items-center gap-1 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-1">
			{(["teacher", "student"] as const).map((role) => {
				const active = value === role;

				return (
					<button
						key={role}
						type="button"
						onClick={() => onChange(role)}
						className={cn(
							"rounded-xl px-3 py-2 text-sm font-medium capitalize transition",
							active
								? "bg-[var(--blue-bg)] text-[var(--blue-text)]"
								: "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
						)}
					>
						{role}
					</button>
				);
			})}
		</div>
	);
}
