import type { LoaderFunctionArgs } from "react-router-dom";
import { API_URL } from "../config";

export const validateCategory = async ({ params }: LoaderFunctionArgs) => {
	const { subject, category } = params;

	if (!subject || !category) {
		throw new Response("Not Found", { status: 404 });
	}

	try {
		const res = await fetch(`${API_URL}/categories/by-subject/${subject}`, {
			credentials: "include",
		});

		if (!res.ok) throw new Error();

		const json = (await res.json()) as { data: { slug: string }[] };
		const validSlugs = json.data.map((c) => c.slug);

		if (!validSlugs.includes(category)) {
			throw new Response("Category Not Found", { status: 404 });
		}
	} catch (e) {
		if (e instanceof Response) throw e;
		// fallback: dacă API-ul e down, lasă ruta să continue
	}

	return null;
};
