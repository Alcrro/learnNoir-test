import { Link } from "react-router-dom";
import { cn } from "../../../../libs/utils/cn";
import {
	difficultyBadgeClasses,
	difficultyLabels,
	progressToneClasses,
} from "../lib/catalogPresentation";
import type { ProgrammingCatalogItem } from "../types/catalog.types";

type Props = {
	item: ProgrammingCatalogItem;
};

const ProgrammingLessonCard = ({ item }: Props) => {
	const difficultyLabel = item.difficulty ? difficultyLabels[item.difficulty] : null;
	const difficultyClass = item.difficulty
		? difficultyBadgeClasses[item.difficulty]
		: "";
	const progressTone = progressToneClasses[item.status];

	const content = (
		<>
			<div className="flex items-start justify-between gap-3">
				<h3 className="text-xl font-semibold tracking-tight text-(--text-primary)">
					{item.name}
				</h3>
				{difficultyLabel && (
					<span
						className={cn(
							"shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
							difficultyClass,
						)}
					>
						{difficultyLabel}
					</span>
				)}
			</div>

			<p className="line-clamp-3 min-h-[4.75rem] text-sm leading-6 text-(--text-secondary)">
				{item.description}
			</p>

			{item.chips.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{item.chips.map((chip) => (
						<span
							key={chip.id}
							className="rounded-full border border-[#49453E] bg-(--bg-page) px-3 py-1 text-xs font-medium text-(--text-primary)"
						>
							{chip.label}
						</span>
					))}
				</div>
			)}

			<div className="mt-auto space-y-2 pt-3">
				<div className="flex items-center justify-between text-sm text-[#8F8F8F]">
					<span>Progres</span>
					<div className="flex items-center gap-2">
						<span>{item.progress}%</span>
						<span className={cn("size-2 rounded-full", progressTone)} />
					</div>
				</div>

				<div className="h-2 overflow-hidden rounded-full bg-(--bg-page)">
					<div
						className={cn("h-full rounded-full transition-[width]", progressTone)}
						style={{ width: `${item.progress}%` }}
					/>
				</div>
			</div>
		</>
	);

	const cardClassName =
		"flex h-full min-h-[17rem] flex-col gap-4 rounded-2xl border border-[#3B3B3B] bg-(--bg-secondary) p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors hover:border-[#4A4A4A]";

	if (!item.isAvailable) {
		return (
			<article className={cn(cardClassName, "opacity-75")}>
				{content}
				<div className="pt-2 text-xs font-medium uppercase tracking-[0.16em] text-(--text-secondary)">
					In curand
				</div>
			</article>
		);
	}

	return (
		<Link
			to={item.path}
			className={cardClassName}
		>
			{content}
		</Link>
	);
};

export default ProgrammingLessonCard;
