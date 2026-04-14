import { useLocation } from "react-router-dom";
import LessonMetaBadge from "../../../../../components/atoms/LessonMetaBadge";
import {
	algorithms,
	Difficulty,
} from "../../data/algorithmsData";
import { cn } from "../../../../../libs/utils/cn";

const AlgorithmLessonMeta = () => {
	const location = useLocation();
	const findAlgorithm = algorithms.find((f) => f.path === location.pathname);

	if (!findAlgorithm) return <div> No lesson found</div>;

	const algoDifficultyMapper: Record<Difficulty, string> = {
		easy: "bg-(--teal-bg) text-(--teal-text)",
		medium: "bg-(--blue-bg) text-[--blue-text]",
		hard: "bg-(--amber-bg) text-(--amber-text)",
	};

	const getDurationColor = (time: number) => {
		if (time <= 20) return "bg-(--teal-bg) text-(--teal-text)";
		if (time < 40) return "bg-(--blue-bg) text-(--blue-text)";
		return "bg-(--amber-bg) text-(--amber-text)";
	};

	return (
		<div className="lesson-meta flex gap-4 capitalize">
			<LessonMetaBadge
				name={findAlgorithm.group}
				classname={cn(
					"badge py-1 bg-(--teal-bg) text-(--teal-text) px-3 rounded-2xl",
				)}
			/>
			<LessonMetaBadge
				name={findAlgorithm.difficulty}
				classname={cn(
					"badge py-1 px-3  rounded-2xl",
					algoDifficultyMapper[findAlgorithm.difficulty],
				)}
			/>
			<LessonMetaBadge
				name={`~${findAlgorithm.estimatedTime}m`}
				classname={cn(
					"badge py-1 px-3 rounded-2xl",
					getDurationColor(findAlgorithm.estimatedTime ?? 15),
				)}
			/>
		</div>
	);
};

export default AlgorithmLessonMeta;
