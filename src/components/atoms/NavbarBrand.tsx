import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "../../content/brandContent";

type Props = {
	onClick?: () => void;
};

export function NavbarBrand({ onClick }: Props) {
	return (
		<Link to="/" className="flex min-w-0 items-center gap-3" onClick={onClick}>
			<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--blue-bg) text-(--blue-text)">
				{BRAND.logo ? (
					<img src={BRAND.logo} alt={BRAND.name} className="h-6 w-6 object-contain" />
				) : (
					<Sparkles className="h-5 w-5" />
				)}
			</div>
			<div className="min-w-0">
				<p className="truncate text-base font-semibold text-(--text-primary)">{BRAND.name}</p>
				<p className="truncate text-xs text-(--text-secondary)">{BRAND.description}</p>
			</div>
		</Link>
	);
}
