import { DashboardBadge } from "../DashboardUI";

type Props = {
	title: string;
	description: string;
	status: string;
};

export function SettingRow({ title, description, status }: Props) {
	return (
		<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-base font-semibold text-(--text-primary)">{title}</p>
					<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{description}</p>
				</div>
				<DashboardBadge label={status} tone="blue" className="max-w-56 justify-center text-center" />
			</div>
		</div>
	);
}
