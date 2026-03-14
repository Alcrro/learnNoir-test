import { useRef, type FC } from "react";
import { cn } from "../../../libs/utils/cn";
import TableOfContents from "../../../components/molecules/TableOfContents";
import ExtendButton from "../../../components/atoms/ExtendButton";
import useToggleDIv from "../../programming/visualizer/hooks/useToggleDIv";
import { useToggleStore } from "../../../store/usetoggleStore";

type SidebarMobileProps = {
	active: boolean;
	toggle: () => void;
};

const SidebarMobile: FC<SidebarMobileProps> = () => {
	const ref = useRef(null);
	const active = useToggleStore((s) => s.toggle.has("sideBar"));
	const closeDiv = useToggleStore((s) => s.closeToggle);
	const openDiv = useToggleStore((s) => s.openToggle);
	console.log({ active });

	useToggleDIv({
		ref,
		active,
		setActive: () => closeDiv("sideBar"),
	});

	return (
		<>
			<div
				className={cn(
					"xl:hidden",
					"max-2xl:fixed max-xl:right-0 max-xl:top-0 z-99999",
					"max-xl:h-full max-xl:w-[320px]",
					"transition-transform duration-500",
					"bg-(--bg-color) p-2",
					!active ? "max-xl:translate-x-full" : "max-xl:translate-x-0",
				)}
				ref={ref}
			>
				<nav
					className=""
					aria-label="table of contents"
				>
					<TableOfContents />
				</nav>
			</div>
			<div
				className={cn(!active ? "fixed m-2 top-10 right-0" : "relative")}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<ExtendButton
					active={active}
					toggle={() => openDiv("sideBar")}
				/>
			</div>
		</>
	);
};

export default SidebarMobile;
