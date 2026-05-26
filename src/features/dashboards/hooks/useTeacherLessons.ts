import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherApi } from "../api/teacherApi";
import { lessonsApi } from "../api/lessonsApi";
import type { CreateLessonPayload, UpdateLessonPayload } from "../types/teacher.types";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";

export function useTeacherLessons() {
	return useQuery({
		queryKey: dashboardQueryKeys.teacherLessons,
		queryFn: teacherApi.getLessons,
	});
}

export function useCreateLesson() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateLessonPayload) => lessonsApi.create(payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: dashboardQueryKeys.teacherLessons }),
	});
}

export function useUpdateLesson() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateLessonPayload }) =>
			lessonsApi.update(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: dashboardQueryKeys.teacherLessons }),
	});
}

export function useDeleteLesson() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => lessonsApi.delete(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: dashboardQueryKeys.teacherLessons }),
	});
}

export function usePublishLesson() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => lessonsApi.publish(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: dashboardQueryKeys.teacherLessons }),
	});
}

export function useReviewLesson() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => lessonsApi.review(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: dashboardQueryKeys.teacherLessons }),
	});
}
