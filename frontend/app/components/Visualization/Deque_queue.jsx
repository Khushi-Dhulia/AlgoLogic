"use client";

import { useState } from "react";

const MAX_SIZE = 15;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Deque() {
  const [deque, setDeque] = useState([]);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const [status, setStatus] = useState({
    operation: "Waiting",
    value: "-",
    front: "null",
    rear: "null",
    size: 0,
    isEmpty: true,
  });

  /* ---------- ENQUEUE FRONT ---------- */
  const enqueueFront = async () => {
    const num = Number(value);
    if (value === "" || num < 0 || num > 200 || deque.length >= MAX_SIZE)
      return;

    const newDeque = [num, ...deque];
    setDeque(newDeque);

    setStatus({
      operation: "enqueue (front)",
      value: num,
      front: newDeque[0],
      rear: newDeque[newDeque.length - 1],
      size: newDeque.length,
      isEmpty: false,
    });

    setActiveIndex(0);
    await sleep(400);
    setActiveIndex(null);
    setValue("");
  };

  /* ---------- ENQUEUE REAR ---------- */
  const enqueueRear = async () => {
    const num = Number(value);
    if (value === "" || num < 0 || num > 200 || deque.length >= MAX_SIZE)
      return;

    const newDeque = [...deque, num];
    setDeque(newDeque);

    setStatus({
      operation: "enqueue (rear)",
      value: num,
      front: newDeque[0],
      rear: newDeque[newDeque.length - 1],
      size: newDeque.length,
      isEmpty: false,
    });

    setActiveIndex(newDeque.length - 1);
    await sleep(400);
    setActiveIndex(null);
    setValue("");
  };

  /* ---------- DEQUEUE FRONT ---------- */
  const dequeueFront = async () => {
    if (deque.length === 0) return;

    setActiveIndex(0);
    await sleep(400);

    const removed = deque[0];
    const newDeque = deque.slice(1);

    setDeque(newDeque);

    setStatus({
      operation: "dequeue (front)",
      value: removed,
      front: newDeque[0] || "null",
      rear: newDeque[newDeque.length - 1] || "null",
      size: newDeque.length,
      isEmpty: newDeque.length === 0,
    });

    setActiveIndex(null);
  };

  /* ---------- DEQUEUE REAR ---------- */
  const dequeueRear = async () => {
    if (deque.length === 0) return;

    const lastIndex = deque.length - 1;
    setActiveIndex(lastIndex);
    await sleep(400);

    const removed = deque[lastIndex];
    const newDeque = deque.slice(0, lastIndex);

    setDeque(newDeque);

    setStatus({
      operation: "dequeue (rear)",
      value: removed,
      front: newDeque[0] || "null",
      rear: newDeque[newDeque.length - 1] || "null",
      size: newDeque.length,
      isEmpty: newDeque.length === 0,
    });

    setActiveIndex(null);
  };

  const reset = () => {
    setDeque([]);
    setActiveIndex(null);

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
      <h2 className="text-3xl font-bold">Deque</h2>

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

        <button onClick={enqueueFront} className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold">
          Enqueue Front
        </button>

        <button onClick={enqueueRear} className="bg-yellow-300 px-5 py-2 rounded-lg font-semibold">
          Enqueue Rear
        </button>

        <button onClick={dequeueFront} className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold">
          Dequeue Front
        </button>

        <button onClick={dequeueRear} className="bg-red-400 text-white px-5 py-2 rounded-lg font-semibold">
          Dequeue Rear
        </button>

        <button onClick={reset} className="border px-5 py-2 rounded-lg">
          Reset
        </button>
      </div>

      <div className="flex gap-8">
        {/* LEFT */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex gap-4 flex-wrap items-center">
          {deque.length === 0 && (
            <div className="text-gray-400">Deque is empty</div>
          )}

          {deque.length > 0 && (
            <span className="text-green-600 font-semibold">Front →</span>
          )}

          {deque.map((item, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center rounded-lg border font-bold transition-all duration-300
                ${
                  activeIndex === index
                    ? "bg-red-400 text-white scale-110"
                    : "bg-yellow-200"
                }`}
            >
              {item}
            </div>
          ))}

          {deque.length > 0 && (
            <span className="text-blue-600 font-semibold">← Rear</span>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-6">

          {/* STATUS */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-black">
              Deque Queue Status
            </h3>
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
            <div>🟢 Front side</div>
            <div>🔵 Rear side</div>
          </div>
        </div>
      </div>
    </section>
  );
}