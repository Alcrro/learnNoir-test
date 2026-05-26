export type TokenKind = "keyword" | "string" | "comment" | "number" | "operator" | "plain";
export type Token = { kind: TokenKind; text: string };
export type Seg = { kind: "text"; tokens: Token[] } | { kind: "blank"; id: number };
export type BlankDef = { id: number; options: string[]; correct: string };
