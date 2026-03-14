import StackAnimation from "../../features/programming/dataStructures/animations/StackAnimation";
import BubbleSortAnimation from "../../features/programming/algorithms/bubble-sort/visualization/BubbleSortAnimation";

export const algorithmComponents: Record<string, Record<string, React.FC>> = {
	algorithms: {
		"bubble-sort": BubbleSortAnimation,
	},
	"data-structures": {
		stack: StackAnimation,
	},
};
