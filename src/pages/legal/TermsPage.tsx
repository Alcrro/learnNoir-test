import DefaultLayout from "../../components/layouts/DefaultLayout";

const TermsPage = () => {
	return (
		<DefaultLayout>
			<div className="mx-auto max-w-3xl py-12 px-4 space-y-8">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight text-(--text-primary)">
						Terms of Service
					</h1>
					<p className="text-sm text-(--text-secondary)">Last updated: June 2026</p>
				</div>

				<div className="prose prose-sm max-w-none text-(--text-secondary) space-y-6">
					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">1. Acceptance</h2>
						<p>
							By creating an account on LearnNoir, you agree to these Terms of Service.
							If you do not agree, do not use the platform.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">2. Account</h2>
						<p>
							You are responsible for maintaining the security of your account. You must
							be at least 16 years old to use LearnNoir. One account per person.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">3. Subscriptions and payments</h2>
						<p>
							Paid plans are billed monthly or annually as selected. Subscriptions
							auto-renew unless cancelled. You can manage or cancel your subscription
							at any time from your account settings. Refunds are handled case by case —
							contact us within 7 days of a charge.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">4. Acceptable use</h2>
						<p>
							You may not use LearnNoir to: share account credentials, reverse-engineer
							the platform, attempt to access other users' data, or use our AI-generated
							content for commercial redistribution without permission.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">5. Content</h2>
						<p>
							All lesson content on LearnNoir is owned by LearnNoir or its content
							creators. You may use it for personal learning only.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">6. Termination</h2>
						<p>
							We reserve the right to suspend or terminate accounts that violate these
							terms. You may delete your account at any time from your profile settings.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">7. Limitation of liability</h2>
						<p>
							LearnNoir is provided "as is." We are not liable for indirect or
							consequential damages. Our maximum liability is limited to the amount
							you paid in the last 12 months.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">8. Contact</h2>
						<p>
							For any questions:{" "}
							<a href="mailto:contact@learnnoir.com" className="underline">
								contact@learnnoir.com
							</a>
						</p>
					</section>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default TermsPage;
