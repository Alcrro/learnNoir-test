import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../../categories/api/categoriesApi";
import { moduleQueryKeys } from "../lib/moduleQueryKeys";

export function useCategoryModules(subject: string, category: string) {
	const { data, isLoading, isError } = useQuery({
		queryKey: moduleQueryKeys.byCategory(subject, category),
		queryFn: () => categoriesApi.getBySubject(subject),
	});

	const categoryData = data?.find((c) => c.slug === category);
	const modules = categoryData?.modules ?? [];

	return { categoryData, modules, isLoading, isError };
}
