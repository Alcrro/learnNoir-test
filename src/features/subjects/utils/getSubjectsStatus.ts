export function getSubjectStatus(completed: number, total: number) {
	if (completed === 0) {
		return {
			label: "Not started",
			cls: "text-gray-400 dark:text-gray-500",
		};
	}

	if (completed === total) {
		return {
			label: "Completed",
			cls: "text-emerald-600 dark:text-emerald-400",
		};
	}

	return {
		label: "In progress",
		cls: "text-blue-600 dark:text-blue-400",
	};
}
