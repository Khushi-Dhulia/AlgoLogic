"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Dijkstra() {
  const graph = {
    A: [
      { node: "B", weight: 4 },
      { node: "C", weight: 2 },
      { node: "D", weight: 5 },
    ],
    B: [{ node: "E", weight: 1 }],
    C: [{ node: "D", weight: 8 }],
    D: [{ node: "E", weight: 3 }],
    E: [],
  };

  const positions = {
    A: { x: 300, y: 60 },
    B: { x: 150, y: 180 },
    C: { x: 450, y: 180 },
    D: { x: 300, y: 260 },
    E: { x: 300, y: 360 },
  };

  const edges = [
    ["A", "B", 4],
    ["A", "C", 2],
    ["A", "D", 5],
    ["B", "E", 1],
    ["C", "D", 8],
    ["D", "E", 3],
  ];

  const nodes = Object.keys(graph);

  const [distances, setDistances] = useState({});
  const [visited, setVisited] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [startNode, setStartNode] = useState("A");
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");

  const startDijkstra = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setVisited([]);
    setActiveNode(null);
    setActiveEdge(null);

    const dist = {};
    const visitedSet = new Set();

    nodes.forEach((node) => (dist[node] = Infinity));
    dist[startNode] = 0;

    setDistances({ ...dist });
    setMessage("Starting Dijkstra...");

    while (visitedSet.size < nodes.length) {
      let current = null;
      let minDistance = Infinity;

      for (let node of nodes) {
        if (!visitedSet.has(node) && dist[node] < minDistance) {
          minDistance = dist[node];
          current = node;
        }
      }

      if (!current) break;

      visitedSet.add(current);
      setVisited((prev) => [...prev, current]);
      setActiveNode(current);
      setMessage(`Processing ${current}`);
      await sleep(1000);

      for (let neighbor of graph[current]) {
        const newDist = dist[current] + neighbor.weight;

        if (newDist < dist[neighbor.node]) {
          dist[neighbor.node] = newDist;
          setActiveEdge([current, neighbor.node]);
          setDistances({ ...dist });
          await sleep(800);
        }
      }

      setActiveEdge(null);
    }

    setActiveNode(null);
    setMessage("✅ Shortest paths calculated!");
    setIsRunning(false);
  };

  const reset = () => {
    setDistances({});
    setVisited([]);
    setActiveNode(null);
    setActiveEdge(null);
    setMessage("");
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-10 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Dijkstra Algorithm</h2>

      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Start Node:</label>
          <select
            value={startNode}
            disabled={isRunning}
            onChange={(e) => setStartNode(e.target.value)}
            className="border px-3 py-1 rounded-lg"
          >
            {nodes.map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={startDijkstra}
          disabled={isRunning}
          className="bg-[#FFEA00] px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Start
        </button>

        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {message && <div className="text-sm text-blue-600">{message}</div>}

      {/* GRAPH */}
      <div className="relative w-full h-[450px] border rounded-lg bg-gray-50">
        <svg className="absolute w-full h-full">
          {edges.map(([from, to, weight], index) => {
            const isActive =
              activeEdge &&
              activeEdge[0] === from &&
              activeEdge[1] === to;

            const x1 = positions[from].x;
            const y1 = positions[from].y;
            const x2 = positions[to].x;
            const y2 = positions[to].y;

            return (
              <g key={index}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "orange" : "#ccc"}
                  strokeWidth="3"
                />
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2}
                  fill="black"
                  fontSize="14"
                >
                  {weight}
                </text>
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node}
            className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-bold border transition-all duration-300
              ${
                visited.includes(node)
                  ? "bg-green-300"
                  : activeNode === node
                  ? "bg-yellow-300 scale-110"
                  : "bg-yellow-100"
              }`}
            style={{
              left: positions[node].x - 28,
              top: positions[node].y - 28,
            }}
          >
            {node}
          </div>
        ))}
      </div>

      {/* DISTANCE TABLE */}
      <div>
        <h3 className="font-semibold">Distances</h3>
        <div className="flex gap-4 mt-2">
          {nodes.map((node) => (
            <div
              key={node}
              className="border px-4 py-2 rounded-lg bg-blue-50"
            >
              {node} :{" "}
              {distances[node] === Infinity
                ? "∞"
                : distances[node] ?? "-"}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}