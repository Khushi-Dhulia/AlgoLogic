// menuData.js

export const dsSections = [
  {
    title: "Linear",
    viewAllHref: "/ds/linear",
    items: [
      {
        name: "Array",
        href: "/ds/array",
      },
      {
        name: "Stack",
        href: "/ds/stack",
      },
      {
        name: "Linked List",
        href: "/ds/linked-list",
        children: [
          {
            name: "Singly Linked List",
            href: "/ds/linked-list/single",
          },
          {
            name: "Doubly Linked List",
            href: "/ds/linked-list/double",
          },
          {
            name: "Circular Linked List",
            href: "/ds/linked-list/circular",
          },
        ],
      },
      {
        name: "Queue",
        href: "/ds/queue",
        children: [
          {
            name: "Simple Queue",
            href: "/ds/queue/simple",
          },
          {
            name: "Circular Queue",
            href: "/ds/queue/circular",
          },
          {
            name: "Deque",
            href: "/ds/queue/deque",
          },
          {
            name: "Priority Queue",
            href: "/ds/queue/priority",
          },
        ],
      },
    ],
  },

  {
    title: "Non-Linear",
    viewAllHref: "/ds/non-linear",
    items: [
      {
        name: "Binary Tree",
        href: "/ds/binary-tree",
      },
      {
        name: "Binary Search Tree",
        href: "/ds/bst",
      },
      {
        name: "AVL Tree",
        href: "/ds/avl-tree",
      },
      {
        name: "Heap",
        href: "/ds/heap",
      },
      {
        name: "Trie",
        href: "/ds/trie",
      },
      {
        name: "Graph",
        href: "/ds/graph",
      },
    ],
  },

  {
    title: "Hashing",
    viewAllHref: "/ds/hashing",
    items: [
      {
        name: "Hash Table",
        href: "/ds/hash-table",
      },
      {
        name: "Hash Map",
        href: "/ds/hash-map",
      },
      {
        name: "Hash Set",
        href: "/ds/hash-set",
      },
      {
        name: "Set",
        href: "/ds/set",
      },
      {
        name: "Map",
        href: "/ds/map",
      },
    ],
  },
];

export const algoSections = [
  {
    title: "Searching",
    viewAllHref: "/algorithms/searching",
    items: [
      {
        name: "Linear Search",
        href: "/algorithms/linear-search",
      },
      {
        name: "Binary Search",
        href: "/algorithms/binary-search",
      },
      {
        name: "Jump Search",
        href: "/algorithms/jump-search",
      },
      {
        name: "Interpolation Search",
        href: "/algorithms/interpolation-search",
      },
    ],
  },

  {
  title: "Sorting I",
  items: [
    { name: "Bubble Sort", href: "/algorithms/bubble-sort" },
    { name: "Selection Sort", href: "/algorithms/selection-sort" },
    { name: "Insertion Sort", href: "/algorithms/insertion-sort" },
    { name: "Merge Sort", href: "/algorithms/merge-sort" },
    { name: "Quick Sort", href: "/algorithms/quick-sort" },
  ],
},
{
  title: "Sorting II",
  items: [
    { name: "Heap Sort", href: "/algorithms/heap-sort" },
    { name: "Counting Sort", href: "/algorithms/counting-sort" },
    { name: "Bucket Sort", href: "/algorithms/bucket-sort" },
    { name: "Radix Sort", href: "/algorithms/radix-sort" },
  ],
},

  {
    title: "Graph",
    viewAllHref: "/algorithms/graph",
    items: [
      {
        name: "Breadth First Search (BFS)",
        href: "/algorithms/bfs",
      },
      {
        name: "Depth First Search (DFS)",
        href: "/algorithms/dfs",
      },
      {
        name: "Dijkstra's Algorithm",
        href: "/algorithms/dijkstra",
      },
      {
        name: "Bellman Ford",
        href: "/algorithms/bellman-ford",
      },
      {
        name: "Floyd Warshall",
        href: "/algorithms/floyd-warshall",
      },
    ],
  },
];