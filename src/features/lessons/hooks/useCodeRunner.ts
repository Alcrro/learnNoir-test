import { useState, useCallback, useEffect, useRef, useId } from "react";

export type RunResult = { lines: string[]; error?: string };

const SANDBOX_SRCDOC = `<!DOCTYPE html><script>
window.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'run') return;
  var lines = [];
  var fakeConsole = {
    log: function() { lines.push(Array.from(arguments).map(function(a){ return typeof a === 'object' ? JSON.stringify(a) : String(a); }).join(' ')); },
    warn: function() { lines.push('⚠ ' + Array.from(arguments).join(' ')); },
    error: function() { lines.push('✗ ' + Array.from(arguments).join(' ')); },
    info: function() { lines.push(Array.from(arguments).join(' ')); },
  };
  try {
    new Function('console', e.data.code)(fakeConsole);
    e.source.postMessage({ type: 'result', channelId: e.data.channelId, lines: lines }, '*');
  } catch(err) {
    e.source.postMessage({ type: 'result', channelId: e.data.channelId, lines: lines, error: err.message }, '*');
  }
});
</script>`;

type Options = {
	initialCode: string;
	canRun: boolean;
	isChallenge: boolean;
};

export function useCodeRunner({ initialCode, canRun, isChallenge }: Options) {
	const reactId = useId();
	const channelId = useRef(reactId.replace(/:/g, ""));
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const [code, setCode] = useState(initialCode);
	const [output, setOutput] = useState<RunResult | null>(null);
	const [running, setRunning] = useState(false);
	const [solved, setSolved] = useState(false);

	useEffect(() => {
		if (!canRun) return;
		const id = channelId.current;
		const handler = (e: MessageEvent) => {
			if (!e.data || e.data.type !== "result" || e.data.channelId !== id) return;
			const result: RunResult = { lines: e.data.lines ?? [], error: e.data.error };
			setOutput(result);
			setRunning(false);
			if (isChallenge && !result.error) setSolved(true);
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, [canRun, isChallenge]);

	const handleRun = useCallback(() => {
		if (!iframeRef.current?.contentWindow) return;
		setRunning(true);
		setOutput(null);
		iframeRef.current.contentWindow.postMessage(
			{ type: "run", code, channelId: channelId.current },
			"*",
		);
	}, [code]);

	const handleReset = useCallback(() => {
		setCode(initialCode);
		setOutput(null);
		setSolved(false);
	}, [initialCode]);

	return { code, setCode, output, running, solved, iframeRef, sandboxSrcdoc: SANDBOX_SRCDOC, handleRun, handleReset };
}
