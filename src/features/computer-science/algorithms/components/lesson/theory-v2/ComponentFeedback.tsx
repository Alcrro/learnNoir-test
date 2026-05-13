import { useState } from "react";
import { ThumbsUp, ThumbsDown, Send, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useComponentFeedback } from "../../../hooks/useComponentFeedback";
import { lessonComponentFeedbackApi } from "../../../../../lessons/api/lessonComponentFeedbackApi";
import type { FeedbackOption } from "../../../../../lessons/api/lessonComponentFeedbackApi";

type Props = {
	lessonId: string;
	componentId: string;
};

export function ComponentFeedback({ lessonId, componentId }: Props) {
	const { upvotes, downvotes, myVote, handleVote, sendMessage } = useComponentFeedback(lessonId, componentId);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [messageSent, setMessageSent] = useState(false);

	const showForm = myVote === "down" && !messageSent;

	// Fetch predefined options only when the form is visible
	const { data: options = [] } = useQuery<FeedbackOption[]>({
		queryKey: ["feedback-options", lessonId, componentId],
		queryFn: () => lessonComponentFeedbackApi.getOptions(lessonId, componentId),
		enabled: showForm && !!lessonId,
		staleTime: 5 * 60_000,
	});

	const onVote = (v: "up" | "down") => {
		handleVote(v);
		if (v === "up" || myVote === v) {
			setSelectedIds([]);
			setMessage("");
			setMessageSent(false);
		}
	};

	const toggleOption = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	const onSend = () => {
		sendMessage(message, selectedIds);
		setMessageSent(true);
		setSelectedIds([]);
		setMessage("");
	};

	return (
		<div className="lt-feedback">
			<div className="lt-feedback__row">
				<button
					type="button"
					onClick={() => onVote("up")}
					className={`lt-feedback__btn${myVote === "up" ? " lt-feedback__btn--up-active" : ""}`}
					title="Conținut util"
				>
					<ThumbsUp size={13} />
					{upvotes > 0 && <span className="lt-feedback__count">{upvotes}</span>}
				</button>

				<button
					type="button"
					onClick={() => onVote("down")}
					className={`lt-feedback__btn${myVote === "down" ? " lt-feedback__btn--down-active" : ""}`}
					title="Conținut de îmbunătățit"
				>
					<ThumbsDown size={13} />
					{downvotes > 0 && <span className="lt-feedback__count">{downvotes}</span>}
				</button>
			</div>

			{showForm && (
				<div className="lt-feedback__form">
					{options.length > 0 && (
						<div className="lt-feedback__options">
							{options.map((opt) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => toggleOption(opt.id)}
									className={`lt-feedback__option${selectedIds.includes(opt.id) ? " lt-feedback__option--selected" : ""}`}
								>
									{opt.label}
								</button>
							))}
						</div>
					)}
					<div className="lt-feedback__form-row">
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Adaugă un mesaj (opțional)"
							rows={2}
							className="lt-feedback__textarea"
						/>
						<button
							type="button"
							onClick={onSend}
							className="lt-feedback__send"
							disabled={selectedIds.length === 0 && message.trim() === ""}
						>
							<Send size={11} />
							Trimite
						</button>
					</div>
				</div>
			)}

			{messageSent && (
				<div className="lt-feedback__thanks">
					<CheckCircle2 size={11} />
					Mulțumim pentru feedback.
				</div>
			)}
		</div>
	);
}
