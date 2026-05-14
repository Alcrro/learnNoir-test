import { SubjectDomain } from "../../../types/types";

export function getSubjectProgress(subject: SubjectDomain) {
	if (subject.modules <= 0) {
		return 0;
	}

	return Math.round((subject.completedModules / subject.modules) * 100);
}
