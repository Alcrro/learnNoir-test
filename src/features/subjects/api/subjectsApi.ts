export type SubjectCardDTO = {
	id: string;
	slug: string;
	title: string;
	description: string;
	modulesCount: number;
	lessonsCount: number;
	totalHours: number;
};

import { API_URL } from "../../../libs/config";

async function get<T>(path: string): Promise<T> {
	const res = await fetch(`${API_URL}${path}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json() as Promise<T>;
}

export const subjectsApi = {
	getSubjects: () =>
		get<{ success: boolean; data: SubjectCardDTO[] }>("/subjects").then((r) => r.data),
};
