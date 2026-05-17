import { useQuery } from "@tanstack/react-query";
import { progressApi } from "../api/progressApi";
import { useGetMe } from "../../auth/hooks/useAuth";

// Fetches all lesson progress rows for the current user, joined with lesson + module metadata.
// Used in the student dashboard to display the lesson progress table.
export function useMyLessonProgressQuery() {
	const { data: me } = useGetMe();

	return useQuery({
		queryKey: ["my-lesson-progress"],
		queryFn: () => progressApi.getAll(),
		staleTime: 60 * 1000,
		enabled: !!me?.userId,
	});
}
