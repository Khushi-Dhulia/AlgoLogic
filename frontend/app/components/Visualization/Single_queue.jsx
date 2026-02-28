"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SingleQueue() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- ENQUEUE ---------- */
  const enqueue = async () => {
    if (!value) return;

    const newQueue = [...queue, value];
    setQueue(newQueue);

    setMessage(`✅ "${value}" added to rear`);

    setHighlight(newQueue.length - 1);
    await sleep(400);
    setHighlight(null);

    setValue("");
  };

  /* ---------- DEQUEUE ---------- */
  const dequeue = async () => {
    if (queue.length === 0) {
      setMessage("❌ Queue is empty");
      return;
    }

    setHighlight(0);
    await sleep(400);

    const removed = queue[0];
    const newQueue = queue.slice(1);

    setQueue(newQueue);
    setMessage(`Removed "${removed}" from front`);

    setHighlight(null);
  };

  /* ---------- PEEK ---------- */
  const peek = async () => {
    if (queue.length === 0) {
      setMessage("❌ Queue is empty");
      return;
    }

    setMessage(`Front Value: ${queue[0]}`);

    setHighlight(0);
    await sleep(600);
    setHighlight(null);
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setQueue([]);
    setMessage("Queue cleared");
    setHighlight(null);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Queue (FIFO)</h2>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={enqueue}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Enqueue
        </button>

        <button
          onClick={dequeue}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Dequeue
        </button>

        <button onClick={peek} className="border px-5 py-2 rounded-lg">
          Peek
        </button>

        <button onClick={reset} className="border px-5 py-2 rounded-lg">
          Clear
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-8">
        {/* LEFT SIDE → QUEUE VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex items-center gap-4 flex-wrap">
          {queue.length === 0 && (
            <div className="text-gray-400">Queue is empty</div>
          )}

          {queue.map((val, index) => (
            <div key={index} className="flex flex-col items-center">
              {index === 0 && (
                <span className="text-xs text-gray-500">Front</span>
              )}

              <div
                className={`
                  px-6 py-3 border rounded-lg font-bold transition-all duration-300

                  ${
                    highlight === index
                      ? "bg-red-400 text-white scale-110"
                      : "bg-yellow-200"
                  }
                `}
              >
                {val}
              </div>

              {index === queue.length - 1 && (
                <span className="text-xs text-gray-500 mt-1">Rear</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">
          {/* STATUS */}
          <div>
            <div className="font-bold text-lg">Status</div>
            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>
          </div>

          {/* Color Key */}
          <div className="border-t pt-3 text-sm space-y-1">
            <div className="font-bold text-lg">Color Key</div>

            <div>🟡 Normal</div>
            <div>🔴 Active</div>
          </div>
        </div>
      </div>
    </section>
  );
}
