"use client";

import { useState } from "react";

const SIZE = 15;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CircularQueue() {
  const [queue, setQueue] = useState(Array(SIZE).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
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

  const isFull = () => (rear + 1) % SIZE === front;
  const isEmpty = () => front === -1;

  const getSize = () => {
    if (isEmpty()) return 0;
    if (rear >= front) return rear - front + 1;
    return SIZE - front + rear + 1;
  };

  /* ---------- ENQUEUE ---------- */
  const enqueue = async () => {
    const num = Number(value);

    if (value === "" || num < 0 || num > 200) return;
    if (isFull()) return;

    let newFront = front;
    let newRear = rear;

    if (isEmpty()) {
      newFront = 0;
      newRear = 0;
    } else {
      newRear = (rear + 1) % SIZE;
    }

    const newQueue = [...queue];
    newQueue[newRear] = num;

    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);

    setStatus({
      operation: "enqueue",
      value: num,
      front: newFront,
      rear: newRear,
      size: getSize() + 1,
      isEmpty: false,
    });

    setActiveIndex(newRear);
    await sleep(500);
    setActiveIndex(null);
    setValue("");
  };

  /* ---------- DEQUEUE ---------- */
  const dequeue = async () => {
    if (isEmpty()) return;

    const removed = queue[front];
    setActiveIndex(front);

    await sleep(500);

    const newQueue = [...queue];
    newQueue[front] = null;

    let newFront = front;
    let newRear = rear;

    if (front === rear) {
      newFront = -1;
      newRear = -1;
    } else {
      newFront = (front + 1) % SIZE;
    }

    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);

    setStatus({
      operation: "dequeue",
      value: removed,
      front: newFront !== -1 ? newFront : "null",
      rear: newRear !== -1 ? newRear : "null",
      size: getSize() - 1,
      isEmpty: newFront === -1,
    });

    setActiveIndex(null);
  };

  const reset = () => {
    setQueue(Array(SIZE).fill(null));
    setFront(-1);
    setRear(-1);
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
      <h2 className="text-3xl font-bold">Circular Queue</h2>

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

        <button onClick={reset} className="border px-5 py-2 rounded-lg font-semibold">
          Reset
        </button>
      </div>

      <div className="flex gap-8">
        {/* LEFT */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex gap-4 flex-wrap">
          {queue.map((val, index) => (
            <div key={index} className="flex flex-col items-center">
              {index === front && <span className="text-green-600 text-xs">Front</span>}

              <div
                className={`w-16 h-16 flex items-center justify-center border rounded-lg font-bold transition-all duration-300
                ${activeIndex === index ? "bg-red-400 text-white scale-110"
                  : val !== null ? "bg-yellow-200"
                  : "bg-gray-200 opacity-40"}
                `}
              >
                {val}
              </div>

              {index === rear && <span className="text-blue-600 text-xs mt-1">Rear</span>}
              <span className="text-xs text-gray-400">{index}</span>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-72 border rounded-xl p-6 bg-white shadow space-y-6">

          {/* STATUS */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-black">Circular Queue Status</h3>

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
            <div>🟡 Filled Slot</div>
            <div>⬜ Empty Slot</div>
            <div>🔴 Active</div>
            <div>🟢 Front Pointer</div>
            <div>🔵 Rear Pointer</div>
          </div>

        </div>
      </div>
    </section>
  );
}