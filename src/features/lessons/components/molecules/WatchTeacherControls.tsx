import { CreatorPaywallBanner } from "../../../subscriptions/components/molecules/CreatorPaywallBanner";
import { AudioGenerateButton } from "../atoms/AudioGenerateButton";

type Props = {
	variant: "generate" | "regenerate";
	isPending: boolean;
	isCreator: boolean;
	onGenerate: () => void;
};

export function WatchTeacherControls({ variant, isPending, isCreator, onGenerate }: Props) {
	return (
		<div className="flex flex-col gap-2">
			<AudioGenerateButton
				variant={variant}
				isPending={isPending}
				disabled={isPending || !isCreator}
				onClick={onGenerate}
			/>
			{!isCreator && <CreatorPaywallBanner feature="Audio narație TTS" className="max-w-sm" />}
		</div>
	);
}
