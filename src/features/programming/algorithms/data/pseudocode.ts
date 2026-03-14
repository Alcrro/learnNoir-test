export const bubblePseudo = [
	{ text: "for i = 0 to n-1", indent: 0 },
	{ text: "swapped = false", indent: 1 },
	{ text: "for j = 0 to n-i-2", indent: 1 },
	{ text: "compare array[j] and array[j+1]", indent: 2 },
	{ text: "if array[j] > array[j+1]", indent: 2 },
	{ text: "swap array[j] and array[j+1]", indent: 3 },
	{ text: "swapped = true", indent: 3 },
	{ text: "mark array[n-i-1] as sorted", indent: 1 },
	{ text: "if swapped == false break", indent: 1 },
];
