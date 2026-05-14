import StackAnimation from "../../subjects/computer-science/dataStructures/animations/StackAnimation";
import BubbleSortAnimation from "../../subjects/computer-science/algorithms/bubble-sort/visualization/BubbleSortAnimation";

export const algorithmComponents: Record<string, Record<string, React.FC>> = {
	algorithms: {
		"bubble-sort": BubbleSortAnimation,
	},
	"data-structures": {
		stack: StackAnimation,
	},
};
