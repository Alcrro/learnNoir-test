import { Lock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../../libs/utils/cn";
import DefaultButton from "../../../../components/atoms/DefaultButton";

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
			<p className="mt-1.5 text-[11px] leading-snug text-(--text-muted)">{label}</p>
			<p className="mt-0.5 text-[11px] font-semibold text-amber-400">începând de la 10 EUR / lună</p>
			<DefaultButton
				variant="ghost"
				size="sm"
				onClick={() => navigate("/pricing")}
				className="mt-2.5 w-full justify-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-500/10 text-[11px] text-amber-400 hover:border-amber-500/60 hover:bg-amber-500/20"
			>
				<Zap className="h-3 w-3" />
				Vezi planurile disponibile
			</DefaultButton>
		</div>
	);
}
