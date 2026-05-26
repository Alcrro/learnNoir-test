import { TOKEN_VAR } from "../lib/tokenize";
import type { Token } from "../lib/types";

export function TokenSpan({ token }: { token: Token }) {
	return <span style={{ color: TOKEN_VAR[token.kind] }}>{token.text}</span>;
}
