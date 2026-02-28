"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
export default function BFS() {
  const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: [],
    F: [],
  };

  const positions = {
    A: { x: 300, y: 60 },
    B: { x: 200, y: 160 },
    C: { x: 400, y: 160 },
    D: { x: 150, y: 280 },
    E: { x: 250, y: 280 },
    F: { x: 400, y: 280 },
  };

  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
    ["C", "F"],
  ];

  const [visited, setVisited] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [queueState, setQueueState] = useState([]);
  const [message, setMessage] = useState("");
  const [startNode, setStartNode] = useState("A");
  const [isRunning, setIsRunning] = useState(false);

  const startBFS = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setVisited([]);
    setActiveNode(null);
    setActiveEdge(null);
    setQueueState([]);

    const queue = [];
    const seen = new Set();

    queue.push(startNode);
    seen.add(startNode);

    setQueueState([...queue]);
    setMessage("Starting BFS...");

    while (queue.length > 0) {
      const node = queue.shift();

      setActiveNode(node);
      setMessage(`Visiting ${node}`);

      await sleep(800);

      setVisited((prev) => [...prev, node]);
      setQueueState([...queue]);

      for (let neighbor of graph[node]) {
        if (!seen.has(neighbor)) {
          queue.push(neighbor);
          seen.add(neighbor);

          setActiveEdge([node, neighbor]);
          setQueueState([...queue]);

          await sleep(600);
        }
      }

      setActiveEdge(null);
    }

    setActiveNode(null);
    setMessage("✅ BFS Completed");
    setIsRunning(false);
  };

  const reset = () => {
    setVisited([]);
    setActiveNode(null);
    setActiveEdge(null);
    setQueueState([]);
    setMessage("");
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Breadth First Search (BFS)</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Start Node:</label>

          <select
            value={startNode}
            disabled={isRunning}
            onChange={(e) => setStartNode(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            {Object.keys(graph).map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={startBFS}
          disabled={isRunning}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Start BFS
        </button>

        <button
          onClick={reset}
          disabled={isRunning}
          className="border px-5 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Message */}
      {message && <div className="text-sm text-blue-600 mb-4">{message}</div>}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT Graph */}
        <div className="lg:col-span-3 border rounded-xl bg-gray-50 relative h-[420px]">
          <svg className="absolute w-full h-full">
            {edges.map(([from, to], index) => {
              const isActive =
                activeEdge && activeEdge[0] === from && activeEdge[1] === to;

              return (
                <line
                  key={index}
                  x1={positions[from].x}
                  y1={positions[from].y}
                  x2={positions[to].x}
                  y2={positions[to].y}
                  stroke={isActive ? "#f59e0b" : "#ccc"}
                  strokeWidth="3"
                />
              );
            })}
          </svg>

          {Object.keys(positions).map((node) => {
            let color = "bg-yellow-100";

            if (visited.includes(node)) color = "bg-green-400";

            if (activeNode === node) color = "bg-yellow-400 scale-110";

            return (
              <div
                key={node}
                className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-bold border transition-all duration-300 ${color}`}
                style={{
                  left: positions[node].x - 28,
                  top: positions[node].y - 28,
                }}
              >
                {node}
              </div>
            );
          })}
        </div>

        {/* RIGHT Panel */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
          {/* Color Key */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color Key</h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Unvisited
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 border rounded"></div>
                Current Node
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 border rounded"></div>
                Visited
              </div>
            </div>
          </div>

          {/* Queue */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Queue</h3>

            <div className="flex gap-2 flex-wrap">
              {queueState.length === 0 && (
                <span className="text-sm text-gray-400">Empty</span>
              )}

              {queueState.map((node, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}