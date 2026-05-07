import { GraduationCap } from "lucide-react";

interface ModulesListHeaderProps {
	name: string;
	moduleCount: number;
	totalLessons: number;
}

export function ModulesListHeader({ name, moduleCount, totalLessons }: ModulesListHeaderProps) {
	return (
		<div className="mt-6">
			<div className="flex items-center gap-2">
				<GraduationCap className="h-6 w-6 text-(--accent-primary)" />
				<h1 className="text-2xl font-bold text-(--text-primary)">{name}</h1>
			</div>
			<p className="mt-2 text-(--text-secondary)">
				{moduleCount} module{moduleCount !== 1 ? "s" : ""} · {totalLessons} lessons
			</p>
		</div>
	);
}
