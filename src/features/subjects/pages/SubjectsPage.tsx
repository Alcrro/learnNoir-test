import { useParams } from "react-router-dom";
import PageStatus from "../../../components/atoms/PageStatus";
import { SUBJECT_REGISTRY } from "../data/subjectRegistry";

const SubjectsPage = () => {
	const { subject } = useParams<{ subject: string }>();
	const SubjectComponent = subject ? SUBJECT_REGISTRY[subject] : undefined;

	if (!SubjectComponent) return <PageStatus message="Subject not found" />;

	return <SubjectComponent />;
};

export default SubjectsPage;
