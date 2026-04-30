import React from "react";
import { getTrackCopy } from "../../../features/subjects/utils/getTrackCopy";
import { SubjectTrack } from "../../../types/types";

const SubjectTrackName = ({ track }: { track: SubjectTrack }) => {
	return <span>{getTrackCopy(track)}</span>;
};

export default SubjectTrackName;
