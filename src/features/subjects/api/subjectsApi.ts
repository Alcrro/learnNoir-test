import { apiClient } from "../../../libs/apiClient";

export type SubjectCardDTO = {
	id: string;
	slug: string;
	title: string;
	description: string;
	modulesCount: number;
	lessonsCount: number;
	totalHours: number;
};

export const subjectsApi = {
	getSubjects: () =>
		apiClient.get<{ data: SubjectCardDTO[] }>("/subjects").then((r) => r.data),
};
