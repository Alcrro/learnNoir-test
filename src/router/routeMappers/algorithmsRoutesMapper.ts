export type AlgorithmMeta = {
  id: string;
  name: string;
  category: "sort" | "search" | "graph" | "other";
};

export const algorithms: AlgorithmMeta[] = [
  { id: "bubble-sort", name: "Bubble Sort", category: "sort" },
  { id: "insertion-sort", name: "Insertion Sort", category: "sort" },
  { id: "linear-search", name: "Linear Search", category: "search" },
];
