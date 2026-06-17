import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
	scenarios: { label: string }[]
	activeIndex: number
	onChange: (index: number) => void
}

export function ScenarioNavigator({ scenarios, activeIndex, onChange }: Props) {
	if (scenarios.length <= 1) return null

	const current = scenarios[activeIndex]

	return (
		<div className="flex items-center justify-center gap-3 pt-3">
			<button
				onClick={() => onChange(activeIndex - 1)}
				disabled={activeIndex === 0}
				className="rounded-md p-1 text-(--text-secondary) transition-colors hover:text-(--text-primary) disabled:pointer-events-none disabled:opacity-30"
			>
				<ChevronLeft className="h-4 w-4" />
			</button>
			<span className="text-sm text-(--text-secondary)">
				{activeIndex + 1} / {scenarios.length}
				{current ? ` — ${current.label}` : ''}
			</span>
			<button
				onClick={() => onChange(activeIndex + 1)}
				disabled={activeIndex === scenarios.length - 1}
				className="rounded-md p-1 text-(--text-secondary) transition-colors hover:text-(--text-primary) disabled:pointer-events-none disabled:opacity-30"
			>
				<ChevronRight className="h-4 w-4" />
			</button>
		</div>
	)
}
