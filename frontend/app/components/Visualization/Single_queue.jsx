"use client";

import { useState } from "react";

const MAX_SIZE = 15;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SingleQueue() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);

  const [status, setStatus] = useState({
    operation: "Waiting",
    value: "-",
    front: "null",
    rear: "null",
    size: 0,
    isEmpty: true,
  });

  /* ---------- ENQUEUE ---------- */
  const enqueue = async () => {
    const num = Number(value);

    if (value === "" || num < 0 || num > 200) return;

    if (queue.length >= MAX_SIZE) {
      setStatus({
        operation: "enqueue",
        value: "-",
        front: queue[0] || "null",
        rear: queue[queue.length - 1] || "null",
        size: queue.length,
        isEmpty: queue.length === 0,
      });
      return;
    }

    const newQueue = [...queue, num];
    setQueue(newQueue);

    setStatus({
      operation: "enqueue",
      value: num,
      front: newQueue[0],
      rear: newQueue[newQueue.length - 1],
      size: newQueue.length,
      isEmpty: false,
    });

    setHighlight(newQueue.length - 1);
    await sleep(400);
    setHighlight(null);
    setValue("");
  };

  /* ---------- DEQUEUE ---------- */
  const dequeue = async () => {
    if (queue.length === 0) return;

    setHighlight(0);
    await sleep(400);

    const removed = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);

    setStatus({
      operation: "dequeue",
      value: removed,
      front: newQueue[0] || "null",
      rear: newQueue[newQueue.length - 1] || "null",
      size: newQueue.length,
      isEmpty: newQueue.length === 0,
    });

    setHighlight(null);
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setQueue([]);
    setHighlight(null);

    setStatus({
      operation: "Waiting",
      value: "-",
      front: "null",
      rear: "null",
      size: 0,
      isEmpty: true,
    });
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Single Queue</h2>

      <div className="flex gap-4 flex-wrap">
        <input
          type="number"
          min="0"
          max="200"
          placeholder="Enter Number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-4 py-2 rounded-lg w-38"
        />

        <button onClick={enqueue} className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold">
          Enqueue
        </button>

        <button onClick={dequeue} className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold">
          Dequeue
        </button>

        <button onClick={reset} className="border px-5 py-2 rounded-lg">
          Reset
        </button>
      </div>

      <div className="flex gap-8">
        {/* LEFT */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex items-center gap-4 flex-wrap">
          {queue.length === 0 && (
            <div className="text-gray-400">Queue is empty</div>
          )}

          {queue.map((val, index) => (
            <div key={index} className="flex flex-col items-center">
              {index === 0 && <span className="text-xs text-gray-500">Front</span>}

              <div
                className={`px-6 py-3 border rounded-lg font-bold transition-all duration-300
                  ${highlight === index ? "bg-red-400 text-white scale-110" : "bg-yellow-200"}
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

        {/* RIGHT PANEL */}
        <div className="w-72 border rounded-xl p-6 bg-white shadow space-y-6">

          {/* STATUS */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-black">Single Queue Status</h3>

            <div className="text-sm space-y-1 text-black">
              <div><span className="font-semibold">Operation:</span> {status.operation}</div>
              <div><span className="font-semibold">Value:</span> {status.value}</div>
              <div><span className="font-semibold">Front:</span> {status.front}</div>
              <div><span className="font-semibold">Rear:</span> {status.rear}</div>
              <div><span className="font-semibold">Size:</span> {status.size}</div>
              <div><span className="font-semibold">Is Empty:</span> {status.isEmpty ? "Yes" : "No"}</div>
            </div>
          </div>

          {/* LIMITS */}
          <div className="border-t pt-4 text-sm space-y-1">
            <div className="font-bold text-lg">Limits</div>
            <div><span className="font-bold">Maximum Values:</span> 15</div>
            <div><span className="font-bold">Number Range:</span> 0 – 200</div>
          </div>

          {/* COLOR KEY */}
          <div className="border-t pt-4 text-sm space-y-1">
            <div className="font-bold text-lg">Color Key</div>
            <div>🟡 Normal</div>
            <div>🔴 Active</div>
          </div>
        </div>
      </div>
    </section>
  );
}