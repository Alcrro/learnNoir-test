import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lessonAudioApi } from "../api/lessonAudioApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useLessonAudio(lessonId: string) {
	const qc = useQueryClient();

	const query = useQuery({
		queryKey: lessonQueryKeys.audio(lessonId),
		queryFn: () => lessonAudioApi.get(lessonId),
		staleTime: Infinity,
	});

	const generate = useMutation({
		mutationFn: () => lessonAudioApi.generate(lessonId),
		onSuccess: (data) => {
			qc.setQueryData(lessonQueryKeys.audio(lessonId), data);
		},
	});

	return { query, generate };
}
