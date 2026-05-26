import type { TheoryLevelExplanation } from "../../api/theoryLevelApi";
import { SimpleMarkdown } from "../SimpleMarkdown";

type Props = {
	explanation: TheoryLevelExplanation | null | undefined;
	isLoading: boolean;
	isFetching: boolean;
};

export function LevelExplanationContent({ explanation, isLoading, isFetching }: Props) {
	if (isLoading || (isFetching && !explanation)) {
		return (
			<div className="space-y-2">
				<div className="h-3 w-3/4 animate-pulse rounded bg-(--border)" />
				<div className="h-3 w-full animate-pulse rounded bg-(--border)" />
				<div className="h-3 w-2/3 animate-pulse rounded bg-(--border)" />
			</div>
		);
	}

	if (!explanation) {
		return (
			<p className="text-sm text-(--text-muted)">
				Explicația pentru acest nivel nu a fost adăugată încă.
			</p>
		);
	}

	return (
		<div>
			<SimpleMarkdown content={explanation.content} className="text-sm leading-relaxed text-(--text)" />
			<div className="mt-2 flex items-center gap-2">
				{explanation.source === "teacher" && (
					<span className="text-[11px] text-(--text-muted)">de la instructor</span>
				)}
				{explanation.source === "ai" && (
					<span className="text-[11px] text-(--text-muted)">generat AI</span>
				)}
			</div>
		</div>
	);
}
