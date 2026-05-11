import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lessonAudioApi } from "../api/lessonAudioApi";

const queryKey = (lessonId: string) => ["lesson-audio", lessonId];

export function useLessonAudio(lessonId: string) {
	const qc = useQueryClient();

	const query = useQuery({
		queryKey: queryKey(lessonId),
		queryFn: () => lessonAudioApi.get(lessonId),
		staleTime: Infinity,
	});

	const generate = useMutation({
		mutationFn: () => lessonAudioApi.generate(lessonId),
		onSuccess: (data) => {
			qc.setQueryData(queryKey(lessonId), data);
		},
	});

	return { query, generate };
}
