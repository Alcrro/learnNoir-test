import { algorithms } from "../../features/computer-science/algorithms/data/algorithmsData";

export function isValidLesson(lessonId: string): boolean {
	algorithms.map((algorithm) => algorithm.id).flat();

	const validLessons = algorithms
		.map((algorithm) => (algorithm.id.includes(lessonId) ? algorithm.id : null))
		.flat();

	return validLessons.includes(lessonId);
}
