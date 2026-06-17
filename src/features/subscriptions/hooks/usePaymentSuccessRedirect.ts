import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { subscriptionQueryKeys } from "../lib/subscriptionQueryKeys";

export function usePaymentSuccessRedirect() {
	const navigate = useNavigate();
	const qc = useQueryClient();

	useEffect(() => {
		void qc.invalidateQueries({ queryKey: subscriptionQueryKeys.myPlan });

		const timer = setTimeout(() => navigate("/"), 4000);
		return () => clearTimeout(timer);
	}, [navigate, qc]);
}
