import { useSearchParams } from "react-router-dom";
import { cn } from "../../../libs/utils/cn";
import type { LessonTabId } from "../hooks/useLessonPageQuery";
import DefaultButton from "../../../components/atoms/DefaultButton";

type Tab = { id: number; uniqueId: LessonTabId; label: string };

type Props = {
	tabs: Tab[];
	tabHandler: (tabId: LessonTabId) => void;
};

// Tab bar for the lesson page. Only renders the tabs passed in — caller controls
// which tabs are active based on what block types the lesson contains.
export function LessonFeatureTabs({ tabs, tabHandler }: Props) {
	const [searchParams] = useSearchParams();
	const tab = searchParams.get("tab") as LessonTabId;

	const changeTab = (tabId: LessonTabId) => {
		tabHandler(tabId);
	};

	return (
		<div className="tabs flex gap-4 capitalize border-b border-(--border)">
			{tabs.map((t) => {
				const isActive = tab === t.uniqueId || (!tab && t.uniqueId === "theoryTab");
				return (
					<DefaultButton
						variant="outline"
						key={t.id}
						onClick={() => changeTab(t.uniqueId)}
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
