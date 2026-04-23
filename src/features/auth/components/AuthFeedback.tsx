import {
	AlertCircle,
	CheckCircle2,
	Info,
	type LucideIcon,
} from "lucide-react";
import { cn } from "../../../libs/utils/cn";

type AuthFeedbackProps = {
	variant: "error" | "success" | "info";
	title: string;
	description: string;
	className?: string;
};

const feedbackVariants: Record<
	AuthFeedbackProps["variant"],
	{ icon: LucideIcon; className: string }
> = {
	error: {
		icon: AlertCircle,
		className:
			"border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300",
	},
	success: {
		icon: CheckCircle2,
		className:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
	},
	info: {
		icon: Info,
		className:
			"border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
	},
};

const AuthFeedback = ({
	variant,
	title,
	description,
	className,
}: AuthFeedbackProps) => {
	const { icon: Icon, className: variantClassName } = feedbackVariants[variant];

	return (
		<div
			className={cn(
				"rounded-2xl border px-4 py-3 shadow-sm",
				variantClassName,
				className,
			)}
			role={variant === "error" ? "alert" : "status"}
		>
			<div className="flex items-start gap-3">
				<Icon className="mt-0.5 h-5 w-5 shrink-0" />
				<div className="space-y-1">
					<p className="text-sm font-semibold">{title}</p>
					<p className="text-sm/6 opacity-90">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default AuthFeedback;
