import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import { Subject } from "../../../../types/interactionTypes";

export const subjectFeatureMap: Record<Subject, FeatureTabUniqueIdType[]> = {
	"computer-science": ["learnTab", "vizTab", "codeTab", "quizTab"],
	mathematics: ["learnTab", "vizTab", "quizTab"], // ❌ fără code
};
