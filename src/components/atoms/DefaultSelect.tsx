type Option<T extends string> = {
	value: T;
	label: string;
};

type SelectProps<T extends string> = {
	value: T;
	onChange: (value: T) => void;
	options: Option<T>[];
	className?: string;
	ariaLabel?: string;
};

export function DefaultSelect<T extends string>({
	value,
	onChange,
	options,
	className = "",
	ariaLabel,
}: SelectProps<T>) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value as T)}
			aria-label={ariaLabel}
			className={[
				"h-10 px-3 text-sm",
				"bg-(--bg-card)",
				"border border-(--border)",
				"rounded-xl text-(--text-primary)",
				"focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
				"cursor-pointer",
				className,
			].join(" ")}
		>
			{options.map((opt) => (
				<option
					key={opt.value}
					value={opt.value}
				>
					{opt.label}
				</option>
			))}
		</select>
	);
}
