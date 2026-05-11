type Props = {
	checked: boolean;
	onChange: (value: boolean) => void;
};

export function ActiveToggle({ checked, onChange }: Props) {
	return (
		<div className="flex items-center justify-between rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-3">
			<div>
				<p className="text-sm font-medium text-(--text-primary)">Active</p>
				<p className="text-xs text-(--text-muted)">Visible to enrolled students</p>
			</div>
			<button
				type="button"
				role="switch"
				aria-checked={checked}
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${
					checked ? "bg-(--teal)" : "bg-(--bg-elevated)"
				}`}
			>
				<span
					className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
						checked ? "translate-x-5" : "translate-x-0"
					}`}
				/>
			</button>
		</div>
	);
}
