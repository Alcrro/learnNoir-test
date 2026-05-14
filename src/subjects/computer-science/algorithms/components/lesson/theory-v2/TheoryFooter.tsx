import { Clock } from "lucide-react";
import { formatRelative } from "../../../../../../libs/utils/formatRelative";

type Props = { updatedAt?: string };

export function TheoryFooter({ updatedAt }: Props) {
	return (
		<div className="mt-10 border-t border-(--border) pt-6">
			{updatedAt && (
				<div className="flex items-center gap-1.5 text-xs text-(--text-muted)">
					<Clock className="h-3.5 w-3.5" />
					Last updated {formatRelative(updatedAt)}
				</div>
			)}
		</div>
	);
}
