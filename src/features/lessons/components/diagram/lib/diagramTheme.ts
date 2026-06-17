import { useState, useEffect } from 'react'

export type DiagramTheme = {
	background: string
	nodeBackground: string
	nodeBorder: string
	nodeText: string
	edgeColor: string
	selectionBackground: string
}

function readTheme(): DiagramTheme {
	const s = getComputedStyle(document.documentElement)
	return {
		background: s.getPropertyValue('--bg-primary').trim(),
		nodeBackground: s.getPropertyValue('--bg-secondary').trim(),
		nodeBorder: s.getPropertyValue('--border').trim(),
		nodeText: s.getPropertyValue('--text-primary').trim(),
		edgeColor: s.getPropertyValue('--text-secondary').trim(),
		selectionBackground: s.getPropertyValue('--accent').trim(),
	}
}

export function useDiagramTheme(): DiagramTheme {
	const [theme, setTheme] = useState<DiagramTheme>(readTheme)

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setTheme(readTheme())
		})
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		})
		return () => observer.disconnect()
	}, [])

	return theme
}
