import type { ReactNode } from "react";
import { EditableSection } from "./EditableSection";
import type { AnyNode } from "../tabs/theory/node-registry";

type Props = {
	children: ReactNode;
	panel: (close: () => void) => ReactNode;
	onUpdate?: (n: AnyNode) => void;
};

export function EditableNode({ children, panel, onUpdate }: Props) {
	if (!onUpdate) return <>{children}</>;
	return <EditableSection editPanel={panel}>{children}</EditableSection>;
}
