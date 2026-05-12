import type { ComponentType } from "react";
import ComputerSciencePages from "../../computer-science/pages/ComputerScience";
import MathPage from "../../mathematics/pages/MathPage";

/**
 * Add a new subject: create its page component, then register it here.
 * The key must match the :subject route param (URL slug).
 */
export const SUBJECT_REGISTRY: Record<string, ComponentType> = {
	"computer-science": ComputerSciencePages,
	mathematics: MathPage,
};
