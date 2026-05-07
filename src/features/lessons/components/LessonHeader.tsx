import { Clock, Trophy } from "lucide-react";

type Props = {
	title: string;
	description: string | null;
	durationSeconds: number;
	score: number | undefined;
};

const LessonHeader = ({ title, description, durationSeconds, score }: Props) => {
	const mins = durationSeconds > 0 ? Math.round(durationSeconds / 60) : null;

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-semibold capitalize tracking-tight text-(--text-primary)">
				{title}
			</h1>
			{description && (
				<p className="text-sm text-(--text-secondary) max-w-2xl">{description}</p>
			)}
			<div className="flex flex-wrap items-center gap-4 text-xs text-(--text-muted)">
				{mins && (
					<div className="flex items-center gap-1">
						<Clock className="h-3.5 w-3.5" />
						<span>~{mins} min</span>
					</div>
				)}
				{score !== undefined && (
					<div className="flex items-center gap-1">
						<Trophy className="h-3.5 w-3.5" />
						<span>{score}% score</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default LessonHeader;
