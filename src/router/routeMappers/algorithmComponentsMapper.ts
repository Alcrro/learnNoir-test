import StackAnimation from "../../features/computer-science/dataStructures/animations/StackAnimation";
import BubbleSortAnimation from "../../features/computer-science/algorithms/bubble-sort/visualization/BubbleSortAnimation";

export const algorithmComponents: Record<string, Record<string, React.FC>> = {
	algorithms: {
		"bubble-sort": BubbleSortAnimation,
	},
	"data-structures": {
		stack: StackAnimation,
	},
};
