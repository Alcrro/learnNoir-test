import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import { Subject } from "../../../../types/interactionTypes";

export const subjectFeatureMap: Record<Subject, FeatureTabUniqueIdType[]> = {
	"computer-science": ["theoryTab", "vizTab", "codeTab", "quizTab"],
	mathematics: ["theoryTab", "vizTab", "quizTab"], // ❌ fără code
};
