import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { subscriptionQueryKeys } from "../lib/subscriptionQueryKeys";

export function PaymentSuccessPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [searchParams] = useSearchParams();
	const plan = searchParams.get("plan");

	useEffect(() => {
		void qc.invalidateQueries({ queryKey: subscriptionQueryKeys.myPlan });

		const timer = setTimeout(() => navigate("/"), 4000);
		return () => clearTimeout(timer);
	}, [navigate, qc]);

	if (plan === "creator") {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
				<div className="flex flex-col items-center gap-3">
					<CheckCircle className="h-16 w-16 text-violet-400" />
					<h1 className="text-2xl font-semibold text-(--text-primary)">
						Planul Creator a fost activat!
					</h1>
					<p className="text-sm text-(--text-muted) max-w-sm">
						Acum poți genera lecții, blocuri și conținut AI.
					</p>
					<p className="text-xs text-(--text-muted) opacity-60">
						Vei fi redirecționat în câteva secunde...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
			<div className="flex flex-col items-center gap-3">
				<CheckCircle className="h-16 w-16 text-emerald-400" />
				<h1 className="text-2xl font-semibold text-(--text-primary)">
					Bine ai venit în Pro!
				</h1>
				<p className="text-sm text-(--text-muted) max-w-sm">
					Subscripția ta a fost activată. Acum ai acces la toate quizurile și exercițiile.
				</p>
				<p className="text-xs text-(--text-muted) opacity-60">
					Vei fi redirecționat în câteva secunde...
				</p>
			</div>
		</div>
	);
}
