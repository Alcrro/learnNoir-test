import { useLocation } from "react-router-dom";
import type { AlgorithmTypes } from "../../shared/AlgorithmTypes";

const KNOWN_ALGORITHMS: AlgorithmTypes[] = [
	"binary-tree-sort",
	"insertion-sort",
	"bubble-sort",
	"quick-sort",
	"heap-sort",
];

export function useCurrentAlgorithm(): AlgorithmTypes | null {
	const { pathname } = useLocation();
	const slug = pathname.split("/").pop() ?? "";
	return KNOWN_ALGORITHMS.find((a) => slug.includes(a)) ?? null;
}
