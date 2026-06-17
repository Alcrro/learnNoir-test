import { WatchTeacherControls } from "../molecules/WatchTeacherControls";

type Props = {
	isTeacherOrAdmin: boolean;
	isPendingGenerate: boolean;
	isCreator: boolean;
	isGenerateError: boolean;
	onGenerate: () => void;
};

export function WatchEmptyState({ isTeacherOrAdmin, isPendingGenerate, isCreator, isGenerateError, onGenerate }: Props) {
	return (
		<div className="flex flex-col items-center gap-4 py-10">
			<p className="text-sm text-(--text-muted)">
				Naratia audio nu a fost inca generata pentru aceasta lectie.
			</p>
			{isTeacherOrAdmin && (
				<WatchTeacherControls
					variant="generate"
					isPending={isPendingGenerate}
					isCreator={isCreator}
					onGenerate={onGenerate}
				/>
			)}
			{isGenerateError && (
				<p className="text-xs text-red-500">Generarea a esuat. Incearca din nou.</p>
			)}
		</div>
	);
}
