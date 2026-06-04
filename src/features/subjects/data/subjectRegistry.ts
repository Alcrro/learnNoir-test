import type { ComponentType } from "react";
import ComputerSciencePages from "../../../features/computer-science/pages/ComputerScience";
import MathPage from "../../../features/mathematics/pages/MathPage";
import LogicPages from "../../../features/logic/pages/LogicPages";

/**
 * Add a new subject: create its page component, then register it here.
 * The key must match the :subject route param (URL slug).
 */
export const SUBJECT_REGISTRY: Record<string, ComponentType> = {
	"computer-science": ComputerSciencePages,
	mathematics: MathPage,
	"logic-and-critical-thinking": LogicPages,
};
