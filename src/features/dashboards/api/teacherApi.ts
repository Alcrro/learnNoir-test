import { api } from "./client";
import type { TeacherLessonDTO, TeacherStatsDTO, TeacherStudentDTO } from "../types/teacher.types";

export const teacherApi = {
	getLessons: () =>
		api.get<{ data: TeacherLessonDTO[] }>("/lessons/mine").then((r) => r.data),

	getStats: () =>
		api.get<{ data: TeacherStatsDTO }>("/lessons/mine/stats").then((r) => r.data),

	getStudents: () =>
		api.get<{ data: TeacherStudentDTO[] }>("/lessons/mine/students").then((r) => r.data),
};
