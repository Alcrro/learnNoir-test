import type { PaymentSuccessCardProps } from "../components/molecules/PaymentSuccessCard";

export const PAYMENT_PLAN_CONFIG: Record<string, PaymentSuccessCardProps> = {
	creator: {
		iconClassName: "text-violet-400",
		title: "Planul Creator a fost activat!",
		description: "Acum poți genera lecții, blocuri și conținut AI.",
	},
	pro: {
		iconClassName: "text-emerald-400",
		title: "Bine ai venit în Pro!",
		description: "Subscripția ta a fost activată. Acum ai acces la toate quizurile și exercițiile.",
	},
};
