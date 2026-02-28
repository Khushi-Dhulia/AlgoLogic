"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function PriorityQueue() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- INSERT ---------- */
  const insertItem = async () => {
    if (!value || priority === "") {
      setMessage("❌ Enter both value and priority");
      return;
    }

    const newItem = {
      value,
      priority: Number(priority),
    };

    const newQueue = [...queue, newItem];

    // Sort descending (higher priority first)
    newQueue.sort((a, b) => b.priority - a.priority);

    setQueue(newQueue);
    setMessage(`✅ "${value}" inserted with priority ${priority}`);

    setValue("");
    setPriority("");
  };

  /* ---------- REMOVE ---------- */
  const removeItem = async () => {
    if (queue.length === 0) {
      setMessage("❌ Queue is Empty");
      return;
    }

    setActiveIndex(0);
    setMessage("Removing highest priority item...");

    await sleep(500);

    const removed = queue[0];
    const newQueue = [...queue];
    newQueue.shift();

    setQueue(newQueue);
    setActiveIndex(null);

    setMessage(`Removed "${removed.value}"`);
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setQueue([]);
    setMessage("Queue cleared");
    setActiveIndex(null);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Priority Queue</h2>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border px-4 py-2 rounded-lg w-28"
        />

        <button
          onClick={insertItem}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Insert
        </button>

        <button
          onClick={removeItem}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Remove Highest
        </button>

        <button onClick={reset} className="border px-5 py-2 rounded-lg">
          Clear
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-8">
        {/* LEFT → VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex gap-4 flex-wrap">
          {queue.length === 0 && (
            <div className="text-gray-400">Queue is empty</div>
          )}

          {queue.map((item, index) => (
            <div
              key={index}
              className={`
                w-24 h-20 border rounded-lg flex flex-col items-center justify-center font-semibold transition-all duration-300

                ${
                  activeIndex === index
                    ? "bg-red-400 text-white scale-110"
                    : "bg-yellow-200"
                }
              `}
            >
              <div>{item.value}</div>
              <div className="text-xs">P: {item.priority}</div>
            </div>
          ))}
        </div>

        {/* RIGHT → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">
          {/* STATUS */}
          <div>
            <div className="font-bold text-lg">Status</div>
            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-2 text-sm">
            <div>📊 Size: {queue.length}</div>
            <div>
              Highest Priority: {queue.length > 0 ? queue[0].priority : "None"}
            </div>
            <div>Top Element: {queue.length > 0 ? queue[0].value : "None"}</div>
          </div>

          {/* Color Key */}
          <div className="border-t pt-3 text-sm space-y-1">
            <div className="font-bold text-lg">Color Key</div>
            <div>🟡 Normal</div>
            <div>🔴 Active (removing)</div>
            <div>🔺 Higher number = Higher priority</div>
          </div>
        </div>
      </div>
    </section>
  );
}
