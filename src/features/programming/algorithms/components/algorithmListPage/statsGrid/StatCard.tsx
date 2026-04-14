type Props = {
	label: string;
	value: string | number;
	color?: string;
};
const StatCard = ({ label, value, color }: Props) => {
	return (
		<div className="flex flex-col gap-2 bg-(--bg-card) rounded-xl p-4 px-8 border-2 border-(--border)">
			<span className={`text-2xl font-medium ${color ?? ""}`}>{value}</span>
			<span className="text-(--text-secondary) text-sm">{label}</span>
		</div>
	);
};

export default StatCard;
