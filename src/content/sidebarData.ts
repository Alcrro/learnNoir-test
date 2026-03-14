export type SidebarItem = {
  id: string;
  name: string;
  path: string; // ruta completă relativă
  group?: string;
};

export const sidebarMap: Record<string, SidebarItem[]> = {
  algorithms: [
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      path: "/learn/programming/algorithms/bubble-sort",
      group: "sort",
    },
    {
      id: "insertion-sort",
      name: "Insertion Sort",
      path: "/learn/programming/algorithms/insertion-sort",
      group: "sort",
    },
    {
      id: "linear-search",
      name: "Linear Search",
      path: "/learn/programming/algorithms/linear-search",
      group: "search",
    },
  ],
  dataStructure: [
    {
      id: "stack",
      name: "Stack",
      path: "/learn/programming/data-structures/stack",
    },
    {
      id: "queue",
      name: "Queue",
      path: "/learn/programming/data-structures/queue",
    },
    {
      id: "linked-list",
      name: "Linked List",
      path: "/learn/programming/data-structures/linked-list",
    },
  ],
};
