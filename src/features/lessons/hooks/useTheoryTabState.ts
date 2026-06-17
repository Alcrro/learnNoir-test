import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLessonTabContext } from "../context/LessonTabContext";
import { useLessonContext } from "../context/LessonContext";
import { useLessonBySlugQuery } from "./useLessonBySlugQuery";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useTheoryTabState() {
	const { lessonId, contentBlocks } = useLessonTabContext();
	const { canEdit, lessonSlug } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const queryClient = useQueryClient();
	const [isBuilderMode, setIsBuilderMode] = useState(false);

	const {
		subject = "",
		category = "",
		module: moduleSlug = "",
	} = useParams<{ subject: string; category: string; module: string }>();

	const contentBlock = contentBlocks[0] ?? null;
	const hasContent = (contentBlock?.data?.content?.length ?? 0) > 0;

	function invalidateBlocks() {
		queryClient.invalidateQueries({ queryKey: lessonQueryKeys.blocks(lessonId) });
	}

	const builderBaseProps = {
		lessonId,
		lessonTitle: lesson?.title,
		lessonDescription: lesson?.description ?? undefined,
		blockId: contentBlock?.id ?? null,
		subject,
		category,
		moduleSlug,
	};

	return { lessonId, canEdit, contentBlocks, contentBlock, hasContent, isBuilderMode, setIsBuilderMode, invalidateBlocks, builderBaseProps };
}
