import type { LoaderFunctionArgs } from "react-router-dom";
import { lessonsApi } from "../../../features/lessons/api/lessonsApi";

export const lessonLoader = async ({ params }: LoaderFunctionArgs) => {
	const { lessonSlug } = params;

	if (!lessonSlug) {
		throw new Response("Not Found", { status: 404 });
	}

	try {
		await lessonsApi.getBySlug(lessonSlug);
	} catch {
		throw new Response("Lesson Not Found", { status: 404 });
	}

	return null;
};
