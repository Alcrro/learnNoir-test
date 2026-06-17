export type EventLoopItem = {
	id: string;
	label: string;
};

export type EventLoopFrame = {
	callStack: EventLoopItem[];
	webApis: EventLoopItem[];
	taskQueue: EventLoopItem[];
	microtaskQueue: EventLoopItem[];
	activeLine: number;
	description: string;
	eventLoopActive?: boolean;
};

export type EventLoopScenario = {
	id: string;
	title: string;
	code: string[];
	frames: EventLoopFrame[];
};
