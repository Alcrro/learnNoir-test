// Primitive refolosibilă pentru orice câmp editabil — text simplu sau textarea.
// Trăiește în edit/shared/ ca să poată fi importată de orice panou de editare.

type Props = {
	label: string;
	value: string;
	onChange: (v: string) => void;
	multiline?: boolean;
};

export function Field({ label, value, onChange, multiline = false }: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">
				{label}
			</span>
			{multiline ? (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={3}
					className="w-full resize-none rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			)}
		</div>
	);
}
