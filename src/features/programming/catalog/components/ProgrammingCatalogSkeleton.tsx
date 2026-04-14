const ProgrammingCatalogSkeleton = () => {
	return (
		<div className="space-y-10">
			<div className="flex flex-wrap gap-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className="h-11 w-28 animate-pulse rounded-xl bg-[#232323]"
					/>
				))}
			</div>

			{Array.from({ length: 2 }).map((_, sectionIndex) => (
				<div
					key={sectionIndex}
					className="space-y-5"
				>
					<div className="h-9 w-48 animate-pulse rounded-xl bg-[#232323]" />
					<div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
						{Array.from({ length: 3 }).map((_, cardIndex) => (
							<div
								key={cardIndex}
								className="h-[17rem] animate-pulse rounded-2xl bg-[#232323]"
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default ProgrammingCatalogSkeleton;
