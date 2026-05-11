import { DefaultSelect } from "../../../../components/atoms/DefaultSelect";

const DIFFICULTIES = [
	{ value: "all", label: "All levels" },
	{ value: "beginner", label: "Beginner" },
	{ value: "intermediate", label: "Intermediate" },
	{ value: "advanced", label: "Advanced" },
];

type DifficultyType = (typeof DIFFICULTIES)[number]["value"];

const SubjectSelectDifficulty = ({
	activeDiff,
	onDiff,
}: {
	activeDiff: string;
	onDiff: (diff: string) => void;
}) => {
	return (
		<DefaultSelect<DifficultyType>
			value={activeDiff}
			onChange={onDiff}
			aria-label="Filter by difficulty"
			className={[
				"h-8 px-3 text-xs",
				"bg-(--bg-card)",
				"border border-(--border)",
				"rounded-lg text-(--text-secondary)",
				"focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
				"cursor-pointer",
			].join(" ")}
			options={DIFFICULTIES}
		/>
	);
};

export default SubjectSelectDifficulty;
