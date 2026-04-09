import type { ReactNode } from "react";
import "../../../components/styles/notebookPage.scss";

const MathPageLayout = ({ children }: { children: ReactNode }) => {
	return <div className="notebook-page rounded-xl">{children}</div>;
};

export default MathPageLayout;
