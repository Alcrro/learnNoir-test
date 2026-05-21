import type { ReactNode } from "react";
import "./notebookPage.scss";

const MathPageLayoutContent = ({ children }: { children: ReactNode }) => {
	return <div className="notebook-page rounded-xl p-2">{children}</div>;
};

export default MathPageLayoutContent;
