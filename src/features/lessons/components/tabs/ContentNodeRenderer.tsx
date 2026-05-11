import { useState, type ReactNode } from "react";
import { Save } from "lucide-react";
import type {
	ConceptBlock,
	StepsBlock,
	ComplexityBlock,
	FormulaBlock,
	ProofBlock,
	TheoremBlock,
	ExampleBlock,
} from "@shared/lesson-content";
import { ConceptNode } from "../molecules/ConceptNode";
import { StepsNode } from "../molecules/StepsNode";
import { ComplexityNode } from "../molecules/ComplexityNode";
import { FormulaNode } from "../molecules/FormulaNode";
import { ProofNode } from "../molecules/ProofNode";
import { TheoremNode } from "../molecules/TheoremNode";
import { ExampleNode } from "../molecules/ExampleNode";
import { EditableSection } from "../edit/EditableSection";

export type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

type Props = {
	node: AnyNode;
	onUpdate?: (updated: AnyNode) => void;
};

// ── shared field primitive ────────────────────────────────────────────────────

function Field({
	label,
	value,
	onChange,
	multiline = false,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	multiline?: boolean;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">
				{label}
			</span>
			{multiline ? (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={3}
					className="w-full resize-none rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			)}
		</div>
	);
}

function PanelActions({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
	return (
		<div className="flex items-center gap-2 border-t border-(--border) pt-3">
			<button
				type="button"
				onClick={onSave}
				className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
			>
				<Save className="h-3.5 w-3.5" />
				Save
			</button>
			<button
				type="button"
				onClick={onCancel}
				className="rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors"
			>
				Cancel
			</button>
		</div>
	);
}

// ── per-type edit panels ──────────────────────────────────────────────────────

function ParagraphEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [text, setText] = useState(typeof node.text === "string" ? node.text : "");
	return (
		<div className="flex flex-col gap-4">
			<Field label="Text" value={text} onChange={setText} multiline />
			<PanelActions onSave={() => onSave({ ...node, text })} onCancel={onCancel} />
		</div>
	);
}

function HeadingEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [text, setText] = useState(typeof node.text === "string" ? node.text : "");
	return (
		<div className="flex flex-col gap-4">
			<Field label="Heading text" value={text} onChange={setText} />
			<PanelActions onSave={() => onSave({ ...node, text })} onCancel={onCancel} />
		</div>
	);
}

function ConceptEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: ConceptBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [title, setTitle] = useState(node.title);
	const [sections, setSections] = useState(node.sections.map((s) => s.text));

	const updated: ConceptBlock = {
		...node,
		title,
		sections: node.sections.map((s, i) => ({ ...s, text: sections[i] ?? s.text })),
	};

	return (
		<div className="flex flex-col gap-4">
			<Field label="Title" value={title} onChange={setTitle} />
			{node.sections.map((s, i) => (
				<Field
					key={i}
					label={s.label}
					value={sections[i] ?? s.text}
					onChange={(v) => setSections((prev) => prev.map((p, j) => (j === i ? v : p)))}
					multiline
				/>
			))}
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}

function StepsEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: StepsBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const extractText = (step: StepsBlock["steps"][number]) =>
		step.content
			.filter((c): c is { type: "paragraph"; text: string } => c.type === "paragraph")
			.map((c) => c.text)
			.join(" ");

	const [titles, setTitles] = useState(node.steps.map((s) => s.title));
	const [texts, setTexts] = useState(node.steps.map(extractText));

	const updated: StepsBlock = {
		...node,
		steps: node.steps.map((s, i) => ({
			...s,
			title: titles[i] ?? s.title,
			content: [{ type: "paragraph" as const, text: texts[i] ?? extractText(s) }],
		})),
	};

	return (
		<div className="flex flex-col gap-5">
			{node.steps.map((s, i) => (
				<div key={i} className="flex flex-col gap-3 border-b border-(--border) pb-4 last:border-0 last:pb-0">
					<span className="text-xs font-semibold text-(--text-muted)">Step {i + 1}</span>
					<Field
						label="Title"
						value={titles[i] ?? s.title}
						onChange={(v) => setTitles((prev) => prev.map((p, j) => (j === i ? v : p)))}
					/>
					<Field
						label="Description"
						value={texts[i] ?? extractText(s)}
						onChange={(v) => setTexts((prev) => prev.map((p, j) => (j === i ? v : p)))}
						multiline
					/>
				</div>
			))}
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}

function ComplexityEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: ComplexityBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [descriptions, setDescriptions] = useState(node.cases.map((c) => c.description));
	const [space, setSpace] = useState(node.space);

	const updated: ComplexityBlock = {
		...node,
		space,
		cases: node.cases.map((c, i) => ({ ...c, description: descriptions[i] ?? c.description })),
	};

	return (
		<div className="flex flex-col gap-4">
			{node.cases.map((c, i) => (
				<Field
					key={c.type}
					label={`${c.type} case — ${c.time}`}
					value={descriptions[i] ?? c.description}
					onChange={(v) => setDescriptions((prev) => prev.map((p, j) => (j === i ? v : p)))}
					multiline
				/>
			))}
			<Field label="Space complexity" value={space} onChange={setSpace} />
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}

function TheoremEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: TheoremBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [title, setTitle] = useState(node.title);
	const [statement, setStatement] = useState(node.statement);
	return (
		<div className="flex flex-col gap-4">
			<Field label="Title" value={title} onChange={setTitle} />
			<Field label="Statement" value={statement} onChange={setStatement} multiline />
			<PanelActions
				onSave={() => onSave({ ...node, title, statement })}
				onCancel={onCancel}
			/>
		</div>
	);
}

function FormulaEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: FormulaBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [latex, setLatex] = useState(node.latex);
	const [description, setDescription] = useState(node.description ?? "");
	return (
		<div className="flex flex-col gap-4">
			<Field label="LaTeX" value={latex} onChange={setLatex} />
			<Field label="Description" value={description} onChange={setDescription} multiline />
			<PanelActions
				onSave={() => onSave({ ...node, latex, description: description || undefined })}
				onCancel={onCancel}
			/>
		</div>
	);
}

function CodeEditPanel({
	node,
	onSave,
	onCancel,
}: {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
}) {
	const [code, setCode] = useState(typeof node.code === "string" ? node.code : "");
	return (
		<div className="flex flex-col gap-4">
			<Field label="Code" value={code} onChange={setCode} multiline />
			<PanelActions onSave={() => onSave({ ...node, code })} onCancel={onCancel} />
		</div>
	);
}

// ── helper: wraps a rendered node with an edit panel ─────────────────────────

function Editable({
	children,
	panel,
	onUpdate,
}: {
	children: ReactNode;
	panel: (close: () => void) => ReactNode;
	onUpdate?: (n: AnyNode) => void;
}) {
	if (!onUpdate) return <>{children}</>;
	return <EditableSection editPanel={panel}>{children}</EditableSection>;
}

// ── main renderer ─────────────────────────────────────────────────────────────

export function ContentNodeRenderer({ node, onUpdate }: Props) {
	const kind = node.type ?? node.nodeType;

	switch (kind) {
		case "concept":
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<ConceptEditPanel
							node={node as ConceptBlock}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<ConceptNode node={node as ConceptBlock} />
				</Editable>
			);

		case "steps":
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<StepsEditPanel
							node={node as StepsBlock}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<StepsNode node={node as StepsBlock} />
				</Editable>
			);

		case "complexity":
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<ComplexityEditPanel
							node={node as ComplexityBlock}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<ComplexityNode node={node as ComplexityBlock} />
				</Editable>
			);

		case "theorem":
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<TheoremEditPanel
							node={node as TheoremBlock}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<TheoremNode node={node as TheoremBlock} />
				</Editable>
			);

		case "formula":
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<FormulaEditPanel
							node={node as FormulaBlock}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<FormulaNode node={node as FormulaBlock} />
				</Editable>
			);

		case "proof":
			return <ProofNode node={node as ProofBlock} />;

		case "example":
			return <ExampleNode example={node as ExampleBlock} />;

		case "heading": {
			const level = typeof node.level === "number" ? node.level : 2;
			const text = typeof node.text === "string" ? node.text : "";
			const Tag = `h${Math.min(Math.max(level, 1), 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
			const classes: Record<string, string> = {
				h1: "text-2xl font-bold text-(--text-primary)",
				h2: "text-xl font-semibold text-(--text-primary)",
				h3: "text-lg font-semibold text-(--text-primary)",
				h4: "text-base font-semibold text-(--text-primary)",
				h5: "text-sm font-semibold text-(--text-primary)",
				h6: "text-sm font-medium text-(--text-secondary)",
			};
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<HeadingEditPanel
							node={node}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<Tag className={classes[Tag]}>{text}</Tag>
				</Editable>
			);
		}

		case "paragraph": {
			const text = typeof node.text === "string" ? node.text : "";
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<ParagraphEditPanel
							node={node}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<p className="text-sm leading-relaxed text-(--text-secondary)">{text}</p>
				</Editable>
			);
		}

		case "code": {
			const code = typeof node.code === "string" ? node.code : "";
			const language = typeof node.language === "string" ? node.language : "";
			return (
				<Editable
					onUpdate={onUpdate}
					panel={(close) => (
						<CodeEditPanel
							node={node}
							onSave={(u) => { onUpdate?.(u); close(); }}
							onCancel={close}
						/>
					)}
				>
					<div className="rounded-xl border border-(--border) bg-(--surface) overflow-x-auto">
						{language && (
							<div className="px-4 py-1.5 border-b border-(--border) text-xs font-mono text-(--text-muted)">
								{language}
							</div>
						)}
						<pre className="p-4 text-sm font-mono text-(--text-primary) whitespace-pre">
							{code}
						</pre>
					</div>
				</Editable>
			);
		}

		default:
			return null;
	}
}
