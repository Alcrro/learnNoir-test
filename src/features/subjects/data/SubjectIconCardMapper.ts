import {
	Atom,
	Binary,
	Calculator,
	CircleDashed,
	Dna,
	FlaskConical,
	LucideIcon,
} from "lucide-react";

export const SUBJECT_ICONS: Record<string, LucideIcon> = {
	"computer-science": Binary,
	mathematics: Calculator,
	physics: Atom,
	chemistry: FlaskConical,
	biology: Dna,
	statistics: CircleDashed,
};
