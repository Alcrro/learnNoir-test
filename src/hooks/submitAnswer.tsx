import { useGetMe } from "../features/auth/hooks/useAuth";

export function useSubmitInteractionAnswer({
	stepId,
	questionId,
	answerId,
}: {
	stepId: string;
	questionId: string;
	answerId: string;
}) {
	const { data: user } = useGetMe();

	if (!user?.userId) return;

	const _isCorrect = checkAnswer(stepId, questionId, answerId);
}

function checkAnswer(stepId: string, questionId: string, answerId: string) {
	return { stepId, questionId, answerId };
}
