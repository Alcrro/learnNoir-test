import type { EventLoopScenario } from "../types/eventLoop.types";

const setTimeoutScenario: EventLoopScenario = {
	id: "setTimeout",
	title: "setTimeout",
	code: [
		"console.log('Start')",
		"",
		"setTimeout(() => {",
		"  console.log('Timeout')",
		"}, 0)",
		"",
		"console.log('End')",
	],
	frames: [
		{
			callStack: [{ id: "main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description:
				"Script starts — main() is pushed onto the call stack.",
		},
		{
			callStack: [
				{ id: "main", label: "main()" },
				{ id: "clog_start", label: "console.log('Start')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description:
				"console.log('Start') is pushed to the call stack and executes synchronously.",
		},
		{
			callStack: [{ id: "main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description:
				"console.log('Start') pops — 'Start' is printed to the console.",
		},
		{
			callStack: [
				{ id: "main", label: "main()" },
				{ id: "st_item", label: "setTimeout(cb, 0)" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 2,
			description:
				"setTimeout() is pushed to the call stack. It's a Web API — it gets handed off immediately.",
		},
		{
			callStack: [{ id: "main", label: "main()" }],
			webApis: [{ id: "st_item", label: "setTimeout(cb, 0)" }],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 2,
			description:
				"setTimeout() is handed to the Web API. The timer starts in the background. Call stack is freed.",
		},
		{
			callStack: [
				{ id: "main", label: "main()" },
				{ id: "clog_end", label: "console.log('End')" },
			],
			webApis: [{ id: "st_item", label: "setTimeout(cb, 0)" }],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 6,
			description:
				"Execution continues synchronously. console.log('End') is pushed while the timer runs in the background.",
		},
		{
			callStack: [{ id: "main", label: "main()" }],
			webApis: [{ id: "st_item", label: "setTimeout(cb, 0)" }],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 6,
			description: "console.log('End') pops — 'End' is printed.",
		},
		{
			callStack: [],
			webApis: [{ id: "st_item", label: "setTimeout(cb, 0)" }],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 6,
			description:
				"main() pops — the call stack is now empty. The timer is still ticking in the Web API.",
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [{ id: "st_item", label: "cb()" }],
			microtaskQueue: [],
			activeLine: 3,
			description:
				"Timer fires! The callback moves from Web APIs to the Task Queue, waiting for the call stack to be empty.",
			eventLoopActive: true,
		},
		{
			callStack: [{ id: "st_item", label: "cb()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description:
				"Event loop sees the call stack is empty — it picks cb() from the Task Queue and pushes it to the call stack.",
			eventLoopActive: true,
		},
		{
			callStack: [
				{ id: "st_item", label: "cb()" },
				{ id: "clog_timeout", label: "console.log('Timeout')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description:
				"cb() is executing. console.log('Timeout') is pushed to the call stack.",
		},
		{
			callStack: [{ id: "st_item", label: "cb()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description: "console.log('Timeout') pops — 'Timeout' is printed.",
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description:
				"cb() pops — execution complete! Output: 'Start' → 'End' → 'Timeout'.",
		},
	],
};

const promiseScenario: EventLoopScenario = {
	id: "promise",
	title: "Promise",
	code: [
		"console.log('Start')",
		"",
		"Promise.resolve()",
		"  .then(() => {",
		"    console.log('Promise')",
		"  })",
		"",
		"console.log('End')",
	],
	frames: [
		{
			callStack: [{ id: "p_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "Script starts — main() is on the call stack.",
		},
		{
			callStack: [
				{ id: "p_main", label: "main()" },
				{ id: "p_clog_start", label: "console.log('Start')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "console.log('Start') pushed and executes.",
		},
		{
			callStack: [{ id: "p_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "console.log('Start') pops — 'Start' printed.",
		},
		{
			callStack: [
				{ id: "p_main", label: "main()" },
				{ id: "p_resolve", label: "Promise.resolve()" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 2,
			description:
				"Promise.resolve() is called — the promise is already resolved. No Web API needed.",
		},
		{
			callStack: [{ id: "p_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [{ id: "p_then_cb", label: ".then(cb)" }],
			activeLine: 3,
			description:
				"Since the promise resolved immediately, .then(cb) goes straight to the Microtask Queue — not the Task Queue!",
		},
		{
			callStack: [
				{ id: "p_main", label: "main()" },
				{ id: "p_clog_end", label: "console.log('End')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [{ id: "p_then_cb", label: ".then(cb)" }],
			activeLine: 7,
			description:
				"Synchronous code continues. console.log('End') pushed while the microtask waits.",
		},
		{
			callStack: [{ id: "p_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [{ id: "p_then_cb", label: ".then(cb)" }],
			activeLine: 7,
			description: "console.log('End') pops — 'End' printed.",
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [{ id: "p_then_cb", label: ".then(cb)" }],
			activeLine: 7,
			description:
				"main() pops — call stack is empty. Microtask Queue has a callback waiting!",
			eventLoopActive: true,
		},
		{
			callStack: [{ id: "p_then_cb", label: ".then(cb)" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 4,
			description:
				"Key difference: microtasks run before tasks! Event loop processes the Microtask Queue first.",
			eventLoopActive: true,
		},
		{
			callStack: [
				{ id: "p_then_cb", label: ".then(cb)" },
				{ id: "p_clog_promise", label: "console.log('Promise')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 4,
			description: "cb() executes — console.log('Promise') pushed.",
		},
		{
			callStack: [{ id: "p_then_cb", label: ".then(cb)" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 4,
			description: "console.log('Promise') pops — 'Promise' printed.",
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 4,
			description:
				"All done! Output: 'Start' → 'End' → 'Promise'. Microtasks always run before tasks.",
		},
	],
};

const mixedScenario: EventLoopScenario = {
	id: "mixed",
	title: "Mixed",
	code: [
		"console.log('Start')",
		"",
		"setTimeout(() => {",
		"  console.log('Task')",
		"}, 0)",
		"",
		"Promise.resolve()",
		"  .then(() => {",
		"    console.log('Microtask')",
		"  })",
		"",
		"console.log('End')",
	],
	frames: [
		{
			callStack: [{ id: "m_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "Script starts.",
		},
		{
			callStack: [
				{ id: "m_main", label: "main()" },
				{ id: "m_clog_start", label: "console.log('Start')" },
			],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "console.log('Start') executes.",
		},
		{
			callStack: [{ id: "m_main", label: "main()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 0,
			description: "'Start' printed.",
		},
		{
			callStack: [{ id: "m_main", label: "main()" }],
			webApis: [{ id: "m_cb1", label: "setTimeout(cb1, 0)" }],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 2,
			description: "setTimeout() handed to Web API — timer starts.",
		},
		{
			callStack: [{ id: "m_main", label: "main()" }],
			webApis: [{ id: "m_cb1", label: "setTimeout(cb1, 0)" }],
			taskQueue: [],
			microtaskQueue: [{ id: "m_then_cb", label: ".then(cb2)" }],
			activeLine: 6,
			description:
				"Promise.resolve().then(cb2) — cb2 goes straight to Microtask Queue.",
		},
		{
			callStack: [
				{ id: "m_main", label: "main()" },
				{ id: "m_clog_end", label: "console.log('End')" },
			],
			webApis: [{ id: "m_cb1", label: "setTimeout(cb1, 0)" }],
			taskQueue: [],
			microtaskQueue: [{ id: "m_then_cb", label: ".then(cb2)" }],
			activeLine: 11,
			description: "console.log('End') pushed.",
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [{ id: "m_cb1", label: "cb1()" }],
			microtaskQueue: [{ id: "m_then_cb", label: ".then(cb2)" }],
			activeLine: 11,
			description:
				"main() pops. Timer fires. Call stack empty — both queues have callbacks. Which runs first?",
			eventLoopActive: true,
		},
		{
			callStack: [{ id: "m_then_cb", label: ".then(cb2)" }],
			webApis: [],
			taskQueue: [{ id: "m_cb1", label: "cb1()" }],
			microtaskQueue: [],
			activeLine: 8,
			description:
				"Microtasks before tasks! Event loop processes Microtask Queue first.",
			eventLoopActive: true,
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [{ id: "m_cb1", label: "cb1()" }],
			microtaskQueue: [],
			activeLine: 8,
			description:
				"'Microtask' printed. Microtask Queue drained. Now the Task Queue can run.",
		},
		{
			callStack: [{ id: "m_cb1", label: "cb1()" }],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description: "Event loop picks cb1() from Task Queue.",
			eventLoopActive: true,
		},
		{
			callStack: [],
			webApis: [],
			taskQueue: [],
			microtaskQueue: [],
			activeLine: 3,
			description:
				"'Task' printed. Done! Output: 'Start' → 'End' → 'Microtask' → 'Task'.",
		},
	],
};

export const eventLoopScenarios: EventLoopScenario[] = [
	setTimeoutScenario,
	promiseScenario,
	mixedScenario,
];
