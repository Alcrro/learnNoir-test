import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useLastLessonStore } from "../../../../store/useLastLessonStore";

const NavbarLastLesson = () => {
	const snapshot = useLastLessonStore((s) => s.snapshot);

	if (!snapshot) return null;

	return (
		<Link
			to={snapshot.href}
			className="inline-flex max-w-45 items-center gap-2 rounded-2xl border border-(--border) bg-(--bg-secondary) px-3 py-2 text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary)"
		>
			<BookOpen className="h-3.5 w-3.5 shrink-0" />
			<span className="truncate text-xs font-medium">{snapshot.title}</span>
		</Link>
	);
};

export default NavbarLastLesson;
