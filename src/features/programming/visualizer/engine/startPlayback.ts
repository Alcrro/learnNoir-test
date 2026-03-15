type StartPlaybackProps = {
	currentStep: number;
	stepNumbers: number;
	setIsPlaying: (value: boolean) => void;
};

export function startPlayback({
	currentStep,
	setIsPlaying,
	stepNumbers,
}: StartPlaybackProps) {
	const play = () => {
		if (currentStep >= stepNumbers - 1) return;
		setIsPlaying(true);
	};
	return { play };
}
