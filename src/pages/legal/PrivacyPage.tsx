import DefaultLayout from "../../components/layouts/DefaultLayout";

const PrivacyPage = () => {
	return (
		<DefaultLayout>
			<div className="mx-auto max-w-3xl py-12 px-4 space-y-8">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight text-(--text-primary)">
						Privacy Policy
					</h1>
					<p className="text-sm text-(--text-secondary)">Last updated: June 2026</p>
				</div>

				<div className="prose prose-sm max-w-none text-(--text-secondary) space-y-6">
					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">1. What data we collect</h2>
						<p>
							We collect your email address and password when you register. We also store your
							learning progress, quiz scores, and subscription status to provide the service.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">2. How we use your data</h2>
						<p>
							Your data is used exclusively to operate LearnNoir: authenticate your account,
							personalize your learning experience, and process payments through Stripe.
							We do not sell your data to third parties.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">3. Cookies</h2>
						<p>
							We use strictly necessary cookies for authentication (httpOnly JWT token).
							No tracking or advertising cookies are set without your consent.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">4. Third-party services</h2>
						<p>
							We use Supabase for database and authentication, Stripe for payment processing,
							and OpenAI for AI-powered content generation. Each has its own privacy policy.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">5. Your rights (GDPR)</h2>
						<p>
							You have the right to access, correct, or delete your personal data at any time.
							You can delete your account from your profile settings. For data export or
							other requests, contact us at{" "}
							<a href="mailto:contact@learnnoir.com" className="underline">
								contact@learnnoir.com
							</a>.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">6. Data retention</h2>
						<p>
							We retain your data for as long as your account is active. After account
							deletion, data is removed within 30 days except where required by law.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-lg font-semibold text-(--text-primary)">7. Contact</h2>
						<p>
							For privacy-related questions:{" "}
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

export default PrivacyPage;
