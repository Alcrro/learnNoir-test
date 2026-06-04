import { Sparkles, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../../libs/utils/cn";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { useGetMe } from "../../../auth/hooks/useAuth";
import { useUpgradeToCreator } from "../../hooks/useUpgradeToCreator";

type Props = {
	feature?: string;
	className?: string;
};

export function CreatorPaywallBanner({ feature, className }: Props) {
	const { data: me } = useGetMe();
	const navigate = useNavigate();
	const upgrade = useUpgradeToCreator();

	const label = feature
		? `„${feature}" necesită planul Creator (€20/lună)`
		: "Această funcție necesită planul Creator (€20/lună)";

	return (
		<div
			className={cn(
				"rounded-lg border border-dashed border-violet-500/40 bg-violet-500/5 p-3 text-center",
				className,
			)}
		>
			<div className="flex items-center justify-center gap-1.5 text-violet-400">
				<Lock className="h-3.5 w-3.5" />
				<span className="text-[11px] font-semibold uppercase tracking-wider">Creator</span>
			</div>
			<p className="mt-1.5 text-[11px] leading-snug text-(--text-muted)">{label}</p>
			{me?.userId ? (
				<DefaultButton
					variant="ghost"
					size="sm"
					onClick={() => upgrade.mutate()}
					disabled={upgrade.isPending}
					aria-label="Activează planul Creator"
					className="mt-2.5 w-full justify-center gap-1.5 rounded-md border border-violet-500/40 bg-violet-500/10 text-[11px] text-violet-400 hover:border-violet-500/60 hover:bg-violet-500/20 focus:ring-2 focus:ring-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<Sparkles className="h-3 w-3" />
					{upgrade.isPending ? "Se redirecționează..." : "Activează Creator"}
				</DefaultButton>
			) : (
				<DefaultButton
					variant="ghost"
					size="sm"
					onClick={() => navigate("/auth/login")}
					aria-label="Autentifică-te pentru a activa planul Creator"
					className="mt-2.5 w-full justify-center gap-1.5 rounded-md border border-violet-500/40 bg-violet-500/10 text-[11px] text-violet-400 hover:border-violet-500/60 hover:bg-violet-500/20 focus:ring-2 focus:ring-violet-500/40"
				>
					Autentifică-te
				</DefaultButton>
			)}
		</div>
	);
}
