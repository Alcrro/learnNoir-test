export const cardClassName = (ring: string) =>
	[
		"group flex h-full flex-col rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm transition duration-200",
		ring,
	].join(" ");
