import { useState, type ReactNode } from "react";
import { Pencil, X } from "lucide-react";
import { useLessonDataStore } from "../../store/useLessonDataStore";

type Props = {
	children: ReactNode;
	editPanel: (close: () => void) => ReactNode;
};

export const EditableSection = ({ children, editPanel }: Props) => {
	const canEdit = useLessonDataStore((s) => s.canEdit);
	const [isLocalEditing, setIsLocalEditing] = useState(false);

	if (!canEdit) return <>{children}</>;

	return (
		<div className="group/section">
			<div className="flex h-6 items-center justify-end">
				{!isLocalEditing ? (
					<button
						type="button"
						onClick={() => setIsLocalEditing(true)}
						className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-(--text-muted) opacity-0 group-hover/section:opacity-100 hover:text-(--accent) hover:bg-(--accent-subtle) transition-all"
					>
						<Pencil className="h-3 w-3" />
						Edit
					</button>
				) : (
					<button
						type="button"
						onClick={() => setIsLocalEditing(false)}
						className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
					>
						<X className="h-3 w-3" />
						Close
					</button>
				)}
			</div>

			{children}

			{isLocalEditing && (
				<div className="mt-3 rounded-xl border border-(--accent) border-dashed bg-(--bg-surface) p-4">
					{editPanel(() => setIsLocalEditing(false))}
				</div>
			)}
		</div>
	);
};
