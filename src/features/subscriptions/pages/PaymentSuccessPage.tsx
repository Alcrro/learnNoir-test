import { useSearchParams } from "react-router-dom";
import { usePaymentSuccessRedirect } from "../hooks/usePaymentSuccessRedirect";
import { PaymentSuccessCard } from "../components/molecules/PaymentSuccessCard";
import { PAYMENT_PLAN_CONFIG } from "../lib/paymentPlanConfig";

export function PaymentSuccessPage() {
	usePaymentSuccessRedirect();
	const [searchParams] = useSearchParams();
	const plan = searchParams.get("plan");

	const config = PAYMENT_PLAN_CONFIG[plan ?? ""] ?? PAYMENT_PLAN_CONFIG.pro;

	return <PaymentSuccessCard {...config} />;
}
