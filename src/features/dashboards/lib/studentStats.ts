import type { TeacherStudentDTO } from "../types/teacher.types";

export function calcAvgScore(students: TeacherStudentDTO[]): number {
	if (students.length === 0) return 0;
	return students.reduce((sum, s) => sum + s.avgScore, 0) / students.length;
}

export function calcAvgCompletion(students: TeacherStudentDTO[]): number {
	if (students.length === 0) return 0;
	return (
		students.reduce(
			(sum, s) =>
				sum + (s.lessonsTotal > 0 ? Math.round((s.lessonsCompleted / s.lessonsTotal) * 100) : 0),
			0,
		) / students.length
	);
}

export function getTopStudents(students: TeacherStudentDTO[], limit = 3): TeacherStudentDTO[] {
	return [...students].sort((a, b) => b.avgScore - a.avgScore).slice(0, limit);
}
