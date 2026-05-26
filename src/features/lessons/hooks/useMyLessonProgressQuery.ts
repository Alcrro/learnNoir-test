import { useQuery } from "@tanstack/react-query";
import { progressApi } from "../api/progressApi";
import { useGetMe } from "../../auth/hooks/useAuth";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useMyLessonProgressQuery() {
	const { data: me } = useGetMe();

	return useQuery({
		queryKey: lessonQueryKeys.myProgress,
		queryFn: () => progressApi.getAll(),
		staleTime: 60 * 1000,
		enabled: !!me?.userId,
	});
}
