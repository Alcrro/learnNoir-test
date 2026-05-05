import { BookOpen, Trophy } from "lucide-react";

type Props = {
	moduleName: string;
	lessonCount: number;
	completedCount: number;
};

export function LessonsListHeader({ moduleName, lessonCount, completedCount }: Props) {
	return (
		<div className="mt-6 mb-2">
			<h1 className="text-2xl font-semibold capitalize text-(--text-primary)">
				{moduleName}
			</h1>

			<div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
				<div className="flex items-center gap-1.5">
					<BookOpen className="h-4 w-4" />
					<span>{lessonCount} lessons</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Trophy className="h-4 w-4" />
					<span>{completedCount} completed</span>
				</div>
			</div>
		</div>
	);
}
