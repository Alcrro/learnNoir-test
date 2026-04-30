import SubjectClearSearchBtn from "../buttons/SubjectClearSearchBtn";

type SubjectSearchInputProps = {
	search: string;
	onSearchChange: (e: string) => void;
};
const SubjectSearchInput = ({
	search,
	onSearchChange,
}: SubjectSearchInputProps) => {
	return (
		<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div className="flex-1">
				<label
					htmlFor="subjects-search"
					className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-(--text-muted)"
				>
					Search subjects
				</label>
				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-(--text-muted)">
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
					<input
						id="subjects-search"
						type="search"
						value={search}
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder="Computer Science, Physics, Algebra..."
						className="h-12 w-full rounded-2xl border border-(--border) bg-(--bg-secondary) pl-11 pr-10 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--blue-border) focus:bg-(--bg-card) focus:ring-2 focus:ring-(--blue-bg)"
					/>
					{search && <SubjectClearSearchBtn onSearchChange={onSearchChange} />}
				</div>
			</div>
		</div>
	);
};

export default SubjectSearchInput;
