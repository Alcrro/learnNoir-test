import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lessonBlocksApi } from "../api/lessonBlocksApi";

export function useUpdateBlockContent(lessonId: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ blockId, content }: { blockId: string; content: Record<string, unknown>[] }) =>
			lessonBlocksApi.updateContent(blockId, content),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-blocks", lessonId] }),
	});
}
