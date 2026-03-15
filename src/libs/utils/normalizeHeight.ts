const MAX_VALUE = 99;
const MIN_BAR = 0;
const MAX_BAR = 99;

export function normalizeHeight(value: number) {
	const abs = Math.abs(value);
	const ratio = abs / MAX_VALUE;
	return MIN_BAR + ratio * (MAX_BAR - MIN_BAR);
}
