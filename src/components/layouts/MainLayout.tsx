import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="min-h-screen flex transition-colors duration-300 group relative overflow-hidden bg-(--lp-bg-page) px-2">
			<main className="flex-1 flex gap-2 px-1 rounded-md group-hover:opacity-80 hover:opacity-100!">
				{children}
			</main>
		</div>
	);
};

export default MainLayout;
