// Dispatcher principal pentru nodurile de conținut ale lecțiilor.
// Nu conține logică de randare sau editare — doar rutează fiecare nod
// spre înregistrarea corespunzătoare din NODE_REGISTRY.
// Adaugi un tip nou: creezi un fișier în edit/panels/ + o linie în node-registry.tsx.

import type { ReactNode } from "react";
import { EditableSection } from "../../edit/EditableSection";
import {
	NODE_REGISTRY,
	PRIMITIVE_EDIT_PANELS,
	HEADING_CLASSES,
	type AnyNode,
} from "./node-registry";

// Re-exportat pentru consumatorii externi care tipizează noduri
export type { AnyNode };

type Props = {
	node: AnyNode;
	onUpdate?: (updated: AnyNode) => void;
};

// ── helper: înfășoară un nod randat cu panoul de editare corespunzător ────────
// Dacă onUpdate lipsește (view-only), returnează direct copilul fără overhead.

function Editable({
	children,
	panel,
	onUpdate,
}: {
	children: ReactNode;
	// `panel` e o funcție factory — primește `close` și returnează panoul de editare.
	// Closure-ul asigură că `close` ajunge la PanelActions fără prop-drilling suplimentar.
	panel: (close: () => void) => ReactNode;
	onUpdate?: (n: AnyNode) => void;
}) {
	if (!onUpdate) return <>{children}</>;
	return <EditableSection editPanel={panel}>{children}</EditableSection>;
}

// ── dispatcher ────────────────────────────────────────────────────────────────

export function ContentNodeRenderer({ node, onUpdate }: Props) {
	const kind = node.type ?? node.nodeType;

	// ── noduri structurate — rezolvate prin registry ──────────────────────────
	const registration = kind ? NODE_REGISTRY[kind] : undefined;
	if (registration) {
		const { Renderer, EditPanel } = registration;
		return (
			<Editable
				onUpdate={onUpdate}
				panel={(close) =>
					EditPanel ? (
						<EditPanel
							node={node}
							onSave={(u: AnyNode) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					) : null
				}
			>
				<Renderer node={node} />
			</Editable>
		);
	}

	// ── tipuri primitive — randare JSX inline cu logică specifică ─────────────

	if (kind === "heading") {
		const level = typeof node.level === "number" ? node.level : 2;
		const text = typeof node.text === "string" ? node.text : "";
		// Clampăm nivelul la [1,6] — date invalide din backend nu trebuie să spargă UI-ul
		const Tag = `h${Math.min(Math.max(level, 1), 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		const EditPanel = PRIMITIVE_EDIT_PANELS.heading;
		return (
			<Editable
				onUpdate={onUpdate}
				panel={(close) => (
					<EditPanel node={node} onSave={(u: AnyNode) => { onUpdate?.(u); close(); }} onCancel={close} />
				)}
			>
				<Tag className={HEADING_CLASSES[Tag]}>{text}</Tag>
			</Editable>
		);
	}

	if (kind === "paragraph") {
		const text = typeof node.text === "string" ? node.text : "";
		const EditPanel = PRIMITIVE_EDIT_PANELS.paragraph;
		return (
			<Editable
				onUpdate={onUpdate}
				panel={(close) => (
					<EditPanel node={node} onSave={(u: AnyNode) => { onUpdate?.(u); close(); }} onCancel={close} />
				)}
			>
				<p className="text-sm leading-relaxed text-(--text-secondary)">{text}</p>
			</Editable>
		);
	}

	if (kind === "code") {
		const code = typeof node.code === "string" ? node.code : "";
		const language = typeof node.language === "string" ? node.language : "";
		const EditPanel = PRIMITIVE_EDIT_PANELS.code;
		return (
			<Editable
				onUpdate={onUpdate}
				panel={(close) => (
					<EditPanel node={node} onSave={(u: AnyNode) => { onUpdate?.(u); close(); }} onCancel={close} />
				)}
			>
				<div className="rounded-xl border border-(--border) bg-(--surface) overflow-x-auto">
					{language && (
						<div className="px-4 py-1.5 border-b border-(--border) text-xs font-mono text-(--text-muted)">
							{language}
						</div>
					)}
					<pre className="p-4 text-sm font-mono text-(--text-primary) whitespace-pre">{code}</pre>
				</div>
			</Editable>
		);
	}

	// Tip necunoscut — ignorat silențios; backend-ul poate trimite tipuri viitoare
	return null;
}
