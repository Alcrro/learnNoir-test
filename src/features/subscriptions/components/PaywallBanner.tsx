import { Lock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../libs/utils/cn";

type Props = {
	label?: string;
	className?: string;
};

export function PaywallBanner({ label = "Mai mult conținut disponibil cu Pro", className }: Props) {
	const navigate = useNavigate();

	return (
		<div
			className={cn(
				"rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 p-3 text-center",
				className,
			)}
		>
			<div className="flex items-center justify-center gap-1.5 text-amber-400">
				<Lock className="h-3.5 w-3.5" />
				<span className="text-[11px] font-semibold uppercase tracking-wider">Pro</span>
			</div>
			<p className="mt-1.5 text-[11px] text-(--text-muted) leading-snug">{label}</p>
			<p className="mt-0.5 text-[11px] font-semibold text-amber-400">începând de la 10 EUR / lună</p>
			<button
				onClick={() => navigate("/pricing")}
				className={cn(
					"mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-400 transition-colors",
					"hover:bg-amber-500/20 hover:border-amber-500/60",
				)}
			>
				<Zap className="h-3 w-3" />
				Vezi planurile disponibile
			</button>
		</div>
	);
}
