import { AlertCircle, RefreshCw } from "lucide-react";
import DefaultButton from "../../../../../../../components/atoms/DefaultButton";

type Props = {
	message?: string;
	onRetry: () => void;
};

export function ExerciseErrorState({ message, onRetry }: Props) {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-3 text-(--text-muted)">
			<AlertCircle className="h-5 w-5 text-red-400" />
			<p className="text-sm">Eroare la încărcarea exercițiilor.</p>
			{message && (
				<p className="text-xs opacity-60">{message}</p>
			)}
			<DefaultButton variant="outline" size="sm" onClick={onRetry} className="flex items-center gap-1.5 text-xs">
				<RefreshCw className="h-3 w-3" />
				Reîncearcă
			</DefaultButton>
		</div>
	);
}
