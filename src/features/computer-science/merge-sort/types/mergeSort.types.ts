export type MergeSortPhase = "divide" | "merge" | "done";
export type NodeState = "idle" | "active" | "sorted" | "done";

export type TreeItem = {
	id: string;
	label: string;
};

export type TreeNode = {
	id: string;
	items: TreeItem[];
	state: NodeState;
};

export type MergeSortFrame = {
	rows: [TreeNode[], TreeNode[], TreeNode[], TreeNode[]];
	description: string;
	stepLabel: string;
	phase: MergeSortPhase;
};
