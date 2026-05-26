import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lessonBlocksApi, type ContentBlock, type LessonBlock } from "../../../../features/lessons/api/lessonBlocksApi";
import { lessonQueryKeys } from "../../../../features/lessons/lib/lessonQueryKeys";

export type AlgorithmLessonOverrides = {
	keyIdea?: string;
	analogy?: string;
	complexityExplainer?: string;
	whenGood?: string[];
	whenAvoid?: string[];
	stepsPrompt?: string;
	miscPrompt?: string;
	// per-section last-saved timestamps (ISO string)
	conceptUpdatedAt?: string;
	complexityUpdatedAt?: string;
	whenToUseUpdatedAt?: string;
	stepsPromptUpdatedAt?: string;
	miscPromptUpdatedAt?: string;
};

const OVERRIDE_NODE_TYPE = "algorithm-lesson-overrides";

function findOverridesBlock(blocks: LessonBlock[]) {
	return (blocks.filter((b) => b.type === "content") as ContentBlock[]).find((b) =>
		b.data.content?.some((n) => (n as { type?: string }).type === OVERRIDE_NODE_TYPE),
	);
}

function extractOverrides(block: ContentBlock | undefined): AlgorithmLessonOverrides | undefined {
	return block?.data.content?.find(
		(n) => (n as { type?: string }).type === OVERRIDE_NODE_TYPE,
	) as AlgorithmLessonOverrides | undefined;
}

export function useAlgorithmLessonOverrides(lessonId: string) {
	const qc = useQueryClient();

	// Subscribe to the same cache key as useLessonBlocksQuery so we re-render on updates.
	// staleTime: Infinity because LessonPage already owns the fetching.
	const { data: blocks = [] } = useQuery<LessonBlock[]>({
		queryKey: lessonQueryKeys.blocks(lessonId),
		queryFn: () => lessonBlocksApi.getByLessonId(lessonId),
		staleTime: Infinity,
		enabled: !!lessonId,
	});

	const overridesBlock = findOverridesBlock(blocks);
	const overrides = extractOverrides(overridesBlock);

	const { mutate: save, isPending: isSaving } = useMutation({
		mutationFn: async (patch: Partial<AlgorithmLessonOverrides>) => {
			// Read latest from cache at call time to avoid stale closure
			const latest = qc.getQueryData<LessonBlock[]>(lessonQueryKeys.blocks(lessonId)) ?? [];
			const latestBlock = findOverridesBlock(latest);
			const latestOverrides = extractOverrides(latestBlock);

			const merged = { ...latestOverrides, ...patch };
			const node = { type: OVERRIDE_NODE_TYPE, ...merged };

			if (latestBlock) {
				const newContent = latestBlock.data.content.map((n) =>
					(n as { type?: string }).type === OVERRIDE_NODE_TYPE ? node : n,
				);
				await lessonBlocksApi.updateContent(latestBlock.id, newContent);
			} else {
				await lessonBlocksApi.createContentBlock(lessonId, [node]);
			}
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: lessonQueryKeys.blocks(lessonId) }),
	});

	return { overrides, save, isSaving };
}
