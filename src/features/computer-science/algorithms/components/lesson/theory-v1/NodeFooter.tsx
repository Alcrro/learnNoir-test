import { useState } from "react";
import { Clock, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { formatRelative } from "../../../../../../libs/utils/formatRelative";

type Vote = "up" | "down" | null;

type Props = {
	lastUpdated?: string;
	canFeedback?: boolean;
};

export function NodeFooter({ lastUpdated, canFeedback = false }: Props) {
	const [vote, setVote] = useState<Vote>(null);
	const [message, setMessage] = useState("");
	const [sent, setSent] = useState(false);

	if (!lastUpdated) return null;

	const handleVote = (v: Vote) => {
		setVote((prev) => (prev === v ? null : v));
		if (v === "up") setSent(false);
	};

	const handleSend = () => {
		// TODO: POST /lessons-blocks/:id/feedback
		setSent(true);
		setMessage("");
	};

	return (
		<div className="border-t border-(--border)">
			<div className="flex items-center justify-between px-4 py-2">
				<span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
					<Clock className="h-3 w-3 shrink-0" />
					Updated {formatRelative(lastUpdated)}
				</span>

				{canFeedback && (
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={() => handleVote("up")}
							title="Content is helpful"
							className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
								vote === "up"
									? "text-green-500 bg-green-500/10"
									: "text-(--text-muted) hover:text-green-500 hover:bg-green-500/10"
							}`}
						>
							<ThumbsUp className="h-3.5 w-3.5" />
						</button>
						<button
							type="button"
							onClick={() => handleVote("down")}
							title="Content needs improvement"
							className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
								vote === "down"
									? "text-red-400 bg-red-400/10"
									: "text-(--text-muted) hover:text-red-400 hover:bg-red-400/10"
							}`}
						>
							<ThumbsDown className="h-3.5 w-3.5" />
						</button>
					</div>
				)}
			</div>

			{canFeedback && vote === "down" && !sent && (
				<div className="px-4 pb-3 flex gap-2">
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="What could be improved? (optional)"
						rows={2}
						className="flex-1 resize-none rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-xs text-(--text-primary) placeholder:text-(--text-muted) outline-none focus:border-(--accent) transition-colors"
					/>
					<button
						type="button"
						onClick={handleSend}
						className="self-end flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
					>
						<Send className="h-3 w-3" />
						Send
					</button>
				</div>
			)}

			{canFeedback && sent && (
				<p className="px-4 pb-3 text-xs text-(--text-muted)">Thanks for the feedback.</p>
			)}
		</div>
	);
}
