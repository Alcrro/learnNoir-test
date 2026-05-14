import { SubjectTrack } from "../../../types/types";

export function getTrackCopy(track: SubjectTrack) {
	switch (track) {
		case "technology":
			return "Technology";
		case "mathematics":
			return "Mathematics";
		case "science":
			return "Science";
	}
}
