import type { ReactNode } from "react";
import "../../../components/styles/notebookPage.scss";

const MathPageLayout = ({ children }: { children: ReactNode }) => {
	return <div className="notebook-page rounded-xl p-2">{children}</div>;
};

export default MathPageLayout;
