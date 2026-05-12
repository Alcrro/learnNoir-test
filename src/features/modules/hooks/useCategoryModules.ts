import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../../categories/api/categoriesApi";

export function useCategoryModules(subject: string, category: string) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["category-modules", subject, category],
		queryFn: () => categoriesApi.getBySubject(subject),
	});

	const categoryData = data?.find((c) => c.slug === category);
	const modules = categoryData?.modules ?? [];

	return { categoryData, modules, isLoading, isError };
}
