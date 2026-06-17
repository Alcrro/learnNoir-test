import { LAYOUT_TEMPLATES } from "./layoutTemplates";
import type { LayoutTemplate } from "./layoutTemplates";

// module slug → template id
const BY_MODULE: Record<string, string> = {
	"sorting-algorithms":     "algorithm",
	"searching-algorithms":   "algorithm",
	"graph-algorithms":       "algorithm",
	"graph-traversal":        "algorithm",
	"shortest-paths":         "algorithm",
	"dynamic-programming":    "algorithm",
	"greedy-algorithms":      "algorithm",
	"arrays-and-lists":       "data-structure",
	"linked-lists":           "data-structure",
	"trees-and-graphs":       "data-structure",
	"stacks-and-queues":      "data-structure",
	"hash-tables":            "data-structure",
	"heaps":                  "data-structure",
	"strings":                "algorithm",
	// system design modules
	"sd-scalability":         "system-design",
	"sd-reliability":         "system-design",
	"sd-cap-theorem":         "system-design",
	"sd-caching":             "system-design",
	"sd-load-balancers":      "system-design",
	"sd-message-queues":      "system-design",
	"sd-api-design":          "system-design",
	"sd-database-scaling":    "system-design",
	"sd-microservices":       "system-design",
	"sd-url-shortener":       "system-design",
	"sd-social-feed":         "system-design",
	"sd-video-streaming":     "system-design",
};

// category slug → template id (fallback when module not matched)
const BY_CATEGORY: Record<string, string> = {
	"algorithms":             "algorithm",
	"data-structures":        "data-structure",
	"mathematics":            "math-concept",
	"calculus":               "math-concept",
	"linear-algebra":         "math-concept",
	"discrete-mathematics":   "math-concept",
	"javascript":             "javascript-concept",
	"web-development":        "javascript-concept",
	"react":                  "javascript-concept",
};

// subject slug → template id (broadest fallback)
const BY_SUBJECT: Record<string, string> = {
	"computer-science":            "algorithm",
	"mathematics":                 "math-concept",
	"logic-and-critical-thinking": "logic-concept",
	"javascript":                  "javascript-concept",
};

export function resolveTemplate(
	subject: string,
	category: string,
	moduleSlug: string,
): LayoutTemplate {
	const id =
		BY_MODULE[moduleSlug] ??
		BY_CATEGORY[category] ??
		BY_SUBJECT[subject] ??
		"general";

	return LAYOUT_TEMPLATES.find((t) => t.id === id) ?? LAYOUT_TEMPLATES.find((t) => t.id === "general")!;
}
