import {
	Atom,
	BarChart2,
	Binary,
	Brain,
	Calculator,
	Dna,
	FlaskConical,
	Landmark,
	LucideIcon,
} from "lucide-react";

export const SUBJECT_ICONS: Record<string, LucideIcon> = {
	"computer-science": Binary,
	"logic-and-critical-thinking": Brain,
	mathematics: Calculator,
	history: Landmark,
	physics: Atom,
	chemistry: FlaskConical,
	biology: Dna,
	statistics: BarChart2,
};
