import { Link } from "react-router-dom";
import { Radio, CalendarClock, BookOpen } from "lucide-react";

type Props = {
	lesson: { title: string; status: string } | null;
};

const config = {
	Live: {
		icon: Radio,
		className:
			"border-(--teal-border) bg-(--teal-bg) text-(--teal-text) hover:opacity-80",
		iconClassName: "animate-pulse",
	},
	Scheduled: {
		icon: CalendarClock,
		className:
			"border-(--blue-border) bg-(--blue-bg) text-(--blue-text) hover:opacity-80",
		iconClassName: "",
	},
	default: {
		icon: BookOpen,
		className:
			"border-(--border) bg-(--bg-secondary) text-(--text-secondary) hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary)",
		iconClassName: "",
	},
} as const;

const NavbarLiveLesson = ({ lesson }: Props) => {
	if (!lesson) return null;

	const style =
		lesson.status === "Live"
			? config.Live
			: lesson.status === "Scheduled"
				? config.Scheduled
				: config.default;

	const Icon = style.icon;

	return (
		<Link
			to="/dashboard/lessons"
			className={`inline-flex max-w-45 items-center gap-2 rounded-2xl border px-3 py-2 transition ${style.className}`}
		>
			<Icon className={`h-3.5 w-3.5 shrink-0 ${style.iconClassName}`} />
			<span className="truncate text-xs font-medium">{lesson.title}</span>
		</Link>
	);
};

export default NavbarLiveLesson;
