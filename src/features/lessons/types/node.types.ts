import type { ComponentType, ReactNode } from "react";

export type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

export type EditPanelProps = {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export type NodeRegistration = {
	Renderer: (props: { node: AnyNode }) => ReactNode;
	EditPanel?: ComponentType<EditPanelProps>;
};
