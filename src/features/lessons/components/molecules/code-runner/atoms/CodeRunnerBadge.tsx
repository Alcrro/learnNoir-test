import { Terminal } from "lucide-react";
import { NodeBadge } from "../../../atoms/NodeBadge";

export function CodeRunnerBadge({ label }: { label: string }) {
	return <NodeBadge label={label} icon={<Terminal size={10} aria-hidden />} />;
}
