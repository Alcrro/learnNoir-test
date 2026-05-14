import { SubjectAvailability } from "../../../types/types";

export function getAvailabilityCopy(availability: SubjectAvailability) {
	if (availability === "available") {
		return "Available now";
	}

	return "Coming soon";
}
