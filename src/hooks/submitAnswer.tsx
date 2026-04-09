import useAuth from "./useAuth";

export function useSubmitInteractionAnswer({
	stepId,
	questionId,
	answerId,
}: {
	stepId: string;
	questionId: string;
	answerId: string;
}) {
	const { user } = useAuth();

	if (!user?.userId) return;

	const isCorrect = checkAnswer(stepId, questionId, answerId);
	console.log(isCorrect);
}

function checkAnswer(stepId: string, questionId: string, answerId: string) {
	return { stepId, questionId, answerId };
}
