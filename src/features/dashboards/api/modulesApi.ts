import { api } from "./client";
import type { ModuleDTO } from "../types/teacher.types";

export const modulesApi = {
	getAll: () =>
		api.get<{ data: ModuleDTO[] }>("/modules").then((r) => r.data),
};
