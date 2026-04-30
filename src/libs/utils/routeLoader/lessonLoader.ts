import type { LoaderFunctionArgs } from "react-router-dom";
import { isValidLesson } from "../isValidLesson";

export const lessonLoader = ({ params }: LoaderFunctionArgs) => {
	const { category, lessonId } = params;

	if (!category || !lessonId) {
		throw new Response("Not Found", { status: 404 });
	}

	if (!isValidLesson(lessonId)) {
		throw new Response("Invalid Lesson", { status: 404 });
	}

	// dacă vrei poți valida și itemId aici

	return null;
};
