import { Link, useLocation } from "react-router-dom";
import { CrumbsGenerator } from "../../libs/utils/crumbsGenerator";
import { ChevronRight } from "lucide-react";
import { cn } from "../../libs/utils/cn";

export const Breadcrumb = () => {
	const { crumbs } = CrumbsGenerator();
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<div className="breadcrumb p-2 text-sm text-(--text-muted) flex items-center">
			{crumbs.map((c, i) => {
				const isCurrentPage = pathname === c.path;

				return (
					<span
						key={c.path}
						className="flex  items-center"
					>
						<Link
							to={c.path}
							className={cn(isCurrentPage && "text-(--text-primary) hover:underline")}
						>
							{c.label}
						</Link>
						{i < crumbs.length - 1 && <ChevronRight size={18} />}
					</span>
				);
			})}
		</div>
	);
};
