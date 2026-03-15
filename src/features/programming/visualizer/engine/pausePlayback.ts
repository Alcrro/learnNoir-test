const pausePlayback = (setIsPlaying: (value: boolean) => void) => {
	const pause = () => setIsPlaying(false);

	return { pause };
};

export default pausePlayback;
