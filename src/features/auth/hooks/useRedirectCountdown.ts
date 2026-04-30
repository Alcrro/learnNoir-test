import { useEffect, useEffectEvent, useState } from "react";

type UseRedirectCountdownProps = {
	enabled: boolean;
	seconds: number;
	onComplete: () => void;
};

export function useRedirectCountdown({
	enabled,
	seconds,
	onComplete,
}: UseRedirectCountdownProps) {
	const [remainingSeconds, setRemainingSeconds] = useState(seconds);
	const handleComplete = useEffectEvent(onComplete);

	useEffect(() => {
		if (!enabled) {
			setRemainingSeconds(seconds);
			return;
		}

		setRemainingSeconds(seconds);

		if (seconds <= 0) {
			handleComplete();
			return;
		}

		const intervalId = window.setInterval(() => {
			setRemainingSeconds((currentValue) => {
				if (currentValue <= 1) {
					window.clearInterval(intervalId);
					handleComplete();
					return 0;
				}

				return currentValue - 1;
			});
		}, 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [enabled, seconds]);

	return enabled ? remainingSeconds : null;
}
