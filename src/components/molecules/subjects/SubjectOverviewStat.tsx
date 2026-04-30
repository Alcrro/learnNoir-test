type StatProps = {
	label: string;
	value: number | string;
};

const SubjectOverviewStat = ({ label, value }: StatProps) => {
	return (
		<div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-3">
			<p className="text-sm font-semibold text-(--text-primary)">{value}</p>
			<p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-(--text-muted)">
				{label}
			</p>
		</div>
	);
};

export default SubjectOverviewStat;
