import { CheckCircle, Lock, Play, XCircle } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import type { QuizStatus } from "../lib/quizTypes";

const CONFIG: Record<QuizStatus, { icon: React.ElementType; className: string }> = {
	locked: { icon: Lock, className: "text-(--text-muted) opacity-40" },
	available: { icon: Play, className: "text-sky-400" },
	completed: { icon: CheckCircle, className: "text-emerald-400" },
	failed: { icon: XCircle, className: "text-red-400" },
};

type Props = { status: QuizStatus; className?: string };

export function QuizStatusIcon({ status, className }: Props) {
	const { icon: Icon, className: iconClass } = CONFIG[status];
	return <Icon className={cn("h-3.5 w-3.5 shrink-0", iconClass, className)} />;
}
