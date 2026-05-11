import { Sparkles, Loader2 } from "lucide-react";

type Props = {
	fieldKey: string;
	value: string;
	onChange: (v: string) => void;
	multiline?: boolean;
	placeholder?: string;
	isEditing: boolean;
	aiLoading?: boolean;
	onAIImprove?: () => void;
	children: React.ReactNode;
};

export const EditableField = ({
	fieldKey: _fieldKey,
	value,
	onChange,
	multiline = false,
	placeholder,
	isEditing,
	aiLoading,
	onAIImprove,
	children,
}: Props) => {
	if (!isEditing) return <>{children}</>;

	return (
		<div className="relative group flex flex-col gap-1">
			{multiline ? (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					rows={3}
					className="w-full resize-none rounded-lg border border-(--border) bg-(--bg-surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className="w-full rounded-lg border border-(--border) bg-(--bg-surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			)}

			{onAIImprove && (
				<button
					type="button"
					onClick={onAIImprove}
					disabled={aiLoading || !value.trim()}
					className="self-start flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-(--text-muted) hover:text-(--accent) hover:bg-(--accent-subtle) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
				>
					{aiLoading ? (
						<Loader2 className="h-3 w-3 animate-spin" />
					) : (
						<Sparkles className="h-3 w-3" />
					)}
					{aiLoading ? "Improving…" : "Improve with AI"}
				</button>
			)}
		</div>
	);
};
