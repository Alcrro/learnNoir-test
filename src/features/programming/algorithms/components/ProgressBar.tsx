const ProgressBar = ({ value }: { value: number }) => {
	return (
		<div className="space-y-1">
			<div className="text-xs text-white/50">Progress</div>

			<div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
				<div
					className="h-full bg-blue-500 transition-all"
					style={{ width: `${value}%` }}
				/>
			</div>

			<div className="text-xs text-white/60">{value}%</div>
		</div>
	);
};

export default ProgressBar;
