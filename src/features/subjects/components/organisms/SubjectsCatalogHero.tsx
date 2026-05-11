type SubjectsCatalogHeroProps = {
	totalSubjects: number;
	availableSubjects: number;
};

export function SubjectsCatalogHero({
	totalSubjects,
	availableSubjects,
}: SubjectsCatalogHeroProps) {
	return (
		<section className="relative overflow-hidden rounded-[28px] border border-(--border) bg-(--bg-card) px-6 py-8 shadow-sm sm:px-8 lg:px-10">
			<div
				className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-(--blue-bg) blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-(--teal-bg) blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-3xl">
					<span className="inline-flex rounded-full border border-(--blue-border) bg-(--blue-bg) px-3 py-1 text-xs font-medium text-(--blue-text)">
						Subjects hub
					</span>

					<h1 className="mt-4 text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
						Choose the subject you want to grow in next
					</h1>

					<p className="mt-3 max-w-2xl text-sm leading-6 text-(--text-secondary) sm:text-base">
						Start from active learning tracks like Computer Science and Mathematics,
						then keep the upcoming subjects visible while the curriculum expands.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
					<div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
						<p className="text-xs uppercase tracking-[0.18em] text-(--text-muted)">
							Subjects
						</p>
						<p className="mt-2 text-2xl font-semibold text-(--text-primary)">
							{totalSubjects}
						</p>
					</div>

					<div className="rounded-2xl border border-(--teal-border) bg-(--teal-bg) p-4">
						<p className="text-xs uppercase tracking-[0.18em] text-(--teal-text)">
							Open now
						</p>
						<p className="mt-2 text-2xl font-semibold text-(--text-primary)">
							{availableSubjects}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
