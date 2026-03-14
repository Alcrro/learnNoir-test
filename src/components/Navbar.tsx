import { ToggleTheme } from "./molecules/ThemeToggle";

const Navbar = () => {
	return (
		<nav className="flex items-center justify-between bg-(--bg-secondary) p-4 m-2 rounded-lg">
			<div className="logo">LearnNoir</div>
			<div className="flex items-center">
				<ToggleTheme />
				<div className="menu">
					<ul className="flex gap-2">
						<li>settings</li>
						<li>logout</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
