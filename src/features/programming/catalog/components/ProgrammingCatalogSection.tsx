import ProgrammingLessonCard from "./ProgrammingLessonCard";
import type { ProgrammingCatalogSection as ProgrammingCatalogSectionType } from "../types/catalog.types";

type Props = {
	section: ProgrammingCatalogSectionType;
};

const ProgrammingCatalogSection = ({ section }: Props) => {
	return (
		<section className="space-y-5">
			<header className="flex items-end gap-3">
				<h2 className="text-3xl font-semibold tracking-tight text-[#F3F3F3]">
					{section.label}
				</h2>
				<span className="pb-1 text-base text-[#959595]">
					{section.items.length} lectii
				</span>
			</header>

			<div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
				{section.items.map((item) => (
					<ProgrammingLessonCard
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</section>
	);
};

export default ProgrammingCatalogSection;
