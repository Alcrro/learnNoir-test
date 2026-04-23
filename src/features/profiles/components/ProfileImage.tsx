type ProfileImageProps = {
	username?: string;
	avatarUrl?: string;
	size?: "sm" | "md";
};

const SIZE_STYLES = {
	sm: "h-9 w-9 text-sm",
	md: "h-11 w-11 text-base",
} as const;

const ProfileImage = ({
	username,
	avatarUrl,
	size = "md",
}: ProfileImageProps) => {
	const initials =
		username
			?.split(" ")
			.map((part) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase() ?? "LN";

	if (avatarUrl) {
		return (
			<img
				src={avatarUrl}
				alt={`${username ?? "User"} avatar`}
				className={`${SIZE_STYLES[size]} rounded-2xl border border-[color:var(--border)] object-cover`}
			/>
		);
	}

	return (
		<div
			className={[
				SIZE_STYLES[size],
				"flex items-center justify-center rounded-2xl border border-[color:var(--blue-border)] bg-[var(--blue-bg)] font-semibold text-[var(--blue-text)]",
			].join(" ")}
			aria-label={username ?? "Profile"}
		>
			{initials}
		</div>
	);
};

export default ProfileImage;
