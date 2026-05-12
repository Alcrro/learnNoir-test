import type { DashboardLesson } from "../data/dashboardData";

export function countByStatus(lessons: DashboardLesson[], status: DashboardLesson["status"]) {
	return lessons.filter((l) => l.status === status).length;
}
