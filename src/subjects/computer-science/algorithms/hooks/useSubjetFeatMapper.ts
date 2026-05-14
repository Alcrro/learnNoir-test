import {
	ALL_FEATURE_TABS,
	FeatureTabsProps,
} from "../../../../content/FeaturesTabData";
import { Subject } from "../../../../types/interactionTypes";
import { subjectFeatureMap } from "../data/subjectFeatureMap";

export const getTabsForSubject = (subject: Subject): FeatureTabsProps[] => {
	return ALL_FEATURE_TABS.filter((tab) =>
		subjectFeatureMap[subject].includes(tab.uniqueId),
	);
};
