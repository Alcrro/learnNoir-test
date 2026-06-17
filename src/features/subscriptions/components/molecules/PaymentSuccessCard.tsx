import { CheckCircle } from "lucide-react";
import { PaymentRedirectNotice } from "../atoms/PaymentRedirectNotice";

export type PaymentSuccessCardProps = {
	iconClassName: string;
	title: string;
	description: string;
};

export function PaymentSuccessCard({ iconClassName, title, description }: PaymentSuccessCardProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
			<div className="flex flex-col items-center gap-3">
				<CheckCircle className={`h-16 w-16 ${iconClassName}`} />
				<h1 className="text-2xl font-semibold text-(--text-primary)">{title}</h1>
				<p className="max-w-sm text-sm text-(--text-muted)">{description}</p>
				<PaymentRedirectNotice />
			</div>
		</div>
	);
}
