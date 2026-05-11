export function getThinkPrompts(lessonId: string): { steps: string; misconceptions: string } {
	if (lessonId.includes("bubble-sort")) {
		return {
			steps: "Before reading — if you had to sort [5, 1, 4, 2, 8] by only swapping adjacent out-of-order elements, what would you do first?",
			misconceptions:
				"What mistake do you think most people make when coding Bubble Sort for the first time?",
		};
	}
	if (lessonId.includes("binary-search")) {
		return {
			steps: "A sorted list has 100 numbers and you're looking for 42. Without checking each one — what's the fastest strategy to narrow it down?",
			misconceptions:
				"What assumption is usually wrong when people first implement Binary Search?",
		};
	}
	if (lessonId.includes("merge")) {
		return {
			steps: "You have two already-sorted lists. How would you combine them into one sorted list as efficiently as possible?",
			misconceptions: "What do most people forget when implementing Merge Sort?",
		};
	}
	if (lessonId.includes("quick")) {
		return {
			steps: "Pick any element from a list as a 'pivot'. How would you rearrange the other elements around it?",
			misconceptions: "What makes Quick Sort's worst case happen, and when should you watch out?",
		};
	}
	if (lessonId.includes("breadth-first")) {
		return {
			steps: "Starting from one node in a graph, how would you visit all its direct neighbors before going deeper?",
			misconceptions: "What happens if you forget to track visited nodes in BFS?",
		};
	}
	return {
		steps: "Before reading — what repeatable action do you think gets this algorithm closer to a solution on each step?",
		misconceptions:
			"What edge case or wrong assumption do you think catches people off guard with this algorithm?",
	};
}
