type Props = { nodeType: string };

const LINE = "h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600";
const BLOCK = "h-5 w-5 rounded border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700";

export function NodeMiniature({ nodeType }: Props) {
	return (
		<div className="pointer-events-none h-24 overflow-hidden opacity-50 select-none">
			{renderMiniature(nodeType)}
		</div>
	);
}

function renderMiniature(type: string) {
	switch (type) {
		case "heading":
			return (
				<div className="flex flex-col gap-2 p-2 pt-3">
					<div className={`${LINE} w-3/5 h-2.5`} />
				</div>
			);

		case "paragraph":
			return (
				<div className="flex flex-col gap-1.5 p-2 pt-3">
					<div className={`${LINE} w-full`} />
					<div className={`${LINE} w-4/5`} />
					<div className={`${LINE} w-3/5`} />
				</div>
			);

		case "concept":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					<div className={`${LINE} h-2.5 w-1/2`} />
					<div className="flex flex-col gap-1 pl-2 mt-1">
						<div className="flex gap-1 items-center"><div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" /><div className={`${LINE} w-3/4`} /></div>
						<div className={`${LINE} w-2/3 ml-2.5`} />
					</div>
					<div className="flex flex-col gap-1 pl-2 mt-0.5">
						<div className="flex gap-1 items-center"><div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" /><div className={`${LINE} w-2/3`} /></div>
					</div>
				</div>
			);

		case "steps":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					{[1, 2, 3].map((n) => (
						<div key={n} className="flex gap-1.5 items-center">
							<span className="text-[9px] font-bold text-zinc-400 w-3 shrink-0">{n}.</span>
							<div className={`${LINE} flex-1`} />
						</div>
					))}
				</div>
			);

		case "example":
			return (
				<div className="flex flex-col gap-2 p-2 items-center">
					<div className="flex gap-1">
						{[5, 3, 8, 1].map((n) => (
							<div key={n} className={`${BLOCK} flex items-center justify-center text-[9px] font-bold text-zinc-500`}>{n}</div>
						))}
					</div>
					<div className={`${LINE} w-4/5`} />
					<div className="flex gap-8 w-full px-2">
						<div className={`${LINE} w-8`} />
						<div className={`${LINE} w-12`} />
					</div>
				</div>
			);

		case "formula":
			return (
				<div className="flex items-center justify-center h-full">
					<span className="italic text-zinc-400 dark:text-zinc-500 text-sm font-serif">f(n) = n²</span>
				</div>
			);

		case "theorem":
			return (
				<div className="flex flex-col gap-2 p-2 pt-3">
					<div className={`${LINE} h-2 w-4/5`} />
					<div className={`${LINE} w-3/5`} />
				</div>
			);

		case "proof":
			return (
				<div className="flex flex-col gap-1.5 p-2 pt-3">
					<div className={`${LINE} w-full`} />
					<div className={`${LINE} w-4/5 ml-3`} />
					<div className={`${LINE} w-2/3 ml-6`} />
				</div>
			);

		case "code":
			return (
				<div className="rounded bg-zinc-800 dark:bg-zinc-900 p-2 m-1 flex flex-col gap-1.5">
					<div className="h-1 w-8 rounded bg-zinc-600" />
					<div className="flex flex-col gap-1">
						<div className="h-1.5 w-full rounded bg-zinc-600/70" />
						<div className="h-1.5 w-3/4 rounded bg-zinc-600/70 ml-3" />
					</div>
				</div>
			);

		case "complexity":
			return (
				<div className="flex flex-col gap-1 p-2">
					{["Best O(n)", "Avg O(n²)", "Worst O(n²)"].map((row) => (
						<div key={row} className="flex justify-between">
							<span className="text-[9px] text-zinc-400">{row.split(" ")[0]}</span>
							<span className="text-[9px] font-mono text-zinc-400">{row.split(" ")[1]}</span>
						</div>
					))}
					<div className="border-t border-zinc-200 dark:border-zinc-700 mt-0.5 pt-0.5">
						<div className="flex justify-between">
							<span className="text-[9px] text-zinc-400">Space</span>
							<span className="text-[9px] font-mono text-zinc-400">O(1)</span>
						</div>
					</div>
				</div>
			);

		case "think":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					<div className="flex gap-1 items-center">
						<span className="text-[10px] text-zinc-400">✦</span>
						<div className={`${LINE} w-4/5`} />
					</div>
					<div className={`${LINE} w-full`} />
					<div className="mt-1 rounded border border-zinc-300 dark:border-zinc-600 px-2 py-0.5 self-start">
						<span className="text-[9px] text-zinc-400">Arată-mi →</span>
					</div>
				</div>
			);

		case "predict":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					<div className="flex gap-1 items-center">
						<span className="text-[10px] text-zinc-400">↯</span>
						<div className={`${LINE} w-4/5`} />
					</div>
					<div className={`${LINE} w-full`} />
					<div className="mt-1 rounded border border-zinc-300 dark:border-zinc-600 px-2 py-0.5 self-start">
						<span className="text-[9px] text-zinc-400">Am gândit →</span>
					</div>
				</div>
			);

		case "recall":
			return (
				<div className="flex flex-col gap-1 p-2">
					<div className="flex gap-1 items-center mb-0.5">
						<span className="text-[10px] text-zinc-400">◎</span>
						<div className={`${LINE} w-3/4`} />
					</div>
					{["A", "B", "C"].map((opt) => (
						<div key={opt} className="flex gap-1.5 items-center">
							<div className="w-2.5 h-2.5 rounded-full border border-zinc-300 dark:border-zinc-600 shrink-0" />
							<div className={`${LINE} w-2/3`} />
						</div>
					))}
				</div>
			);

		case "inline-quiz":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					<div className={`${LINE} w-full`} />
					{["A", "B"].map((opt) => (
						<div key={opt} className="flex gap-1.5 items-center">
							<div className="w-2.5 h-2.5 rounded-full border border-zinc-300 dark:border-zinc-600 shrink-0" />
							<div className={`${LINE} w-1/2`} />
						</div>
					))}
				</div>
			);

		case "fill-blanks":
			return (
				<div className="flex flex-col gap-1.5 p-2">
					<div className="flex gap-1 items-center flex-wrap">
						<div className={`${LINE} w-12`} />
						<div className="h-4 w-10 rounded border border-zinc-400 dark:border-zinc-500 bg-zinc-50 dark:bg-zinc-800" />
						<div className={`${LINE} w-8`} />
					</div>
					<div className={`${LINE} w-2/3`} />
				</div>
			);

		case "drag-sort":
			return (
				<div className="flex flex-col gap-1 p-2 items-center">
					{[1, 2, 3].map((n) => (
						<div key={n} className="flex gap-1 items-center w-full">
							<div className="w-2 text-[8px] text-zinc-400">⠿</div>
							<div className={`${BLOCK} flex-1 h-4 rounded`} />
						</div>
					))}
				</div>
			);

		case "code-runner":
			return (
				<div className="rounded bg-zinc-800 dark:bg-zinc-900 p-2 m-1 flex flex-col gap-1.5">
					<div className="flex flex-col gap-1">
						<div className="h-1.5 w-full rounded bg-zinc-600/70" />
						<div className="h-1.5 w-2/3 rounded bg-zinc-600/70 ml-3" />
					</div>
					<div className="flex justify-end mt-0.5">
						<div className="rounded bg-green-700 px-1.5 py-0.5">
							<span className="text-[9px] text-white">▶ Run</span>
						</div>
					</div>
				</div>
			);

		default:
			return (
				<div className="flex items-center justify-center h-full">
					<span className="text-[10px] text-zinc-400 font-mono">{type}</span>
				</div>
			);
	}
}
