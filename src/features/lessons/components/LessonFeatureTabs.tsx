import { useSearchParams } from "react-router-dom";
import { cn } from "../../../libs/utils/cn";
import type { LessonTabId } from "../hooks/useLessonPageQuery";
import { useLessonPageQuery } from "../hooks/useLessonPageQuery";
import DefaultButton from "../../../components/atoms/DefaultButton";
import { useLessonDataStore } from "../store/useLessonDataStore";
import { resolveAvailableTabs } from "../lib/resolveAvailableTabs";

export function LessonFeatureTabs() {
	const [searchParams] = useSearchParams();
	const { setTab } = useLessonPageQuery();
	const blocks = useLessonDataStore((s) => s.blocks);
	const tabs = resolveAvailableTabs(blocks);
	const tab = searchParams.get("tab") as LessonTabId;

	return (
		<div className="tabs flex gap-4 capitalize border-b border-(--border)">
			{tabs.map((t) => {
				const isActive = tab === t.uniqueId || (!tab && t.uniqueId === "theoryTab");
				return (
					<DefaultButton
						variant="outline"
						key={t.id}
						onClick={() => setTab(t.uniqueId)}
						className={cn(
							"cursor-pointer py-1 px-3 text-sm rounded-md",
							isActive && "border-b-2 border-[#378ADD] font-medium",
						)}
					>
						{t.label}
					</DefaultButton>
				);
			})}
		</div>
	);
}
