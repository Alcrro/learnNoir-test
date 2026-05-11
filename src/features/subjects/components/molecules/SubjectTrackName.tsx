import React from "react";
import { getTrackCopy } from "../../utils/getTrackCopy";
import { SubjectTrack } from "../../../../types/types";

const SubjectTrackName = ({ track }: { track: SubjectTrack }) => {
	return <span>{getTrackCopy(track)}</span>;
};

export default SubjectTrackName;
