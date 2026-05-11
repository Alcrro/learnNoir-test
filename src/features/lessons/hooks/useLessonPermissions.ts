import UseGetProfile from "../../profiles/hooks/UseGetProfile";
import type { LessonDTO } from "../api/lessonsApi";

export function useLessonPermissions(lesson: LessonDTO | undefined) {
	const { data: profile, authUser } = UseGetProfile();

	if (!lesson || !profile || !authUser) return { canEdit: false };

	const isTeacherOrAdmin = profile.role === "teacher" || profile.role === "admin";
	const isAuthor = lesson.authors.some((a) => a.userId === authUser.userId);

	return {
		canEdit: isTeacherOrAdmin && (profile.role === "admin" || isAuthor),
	};
}
