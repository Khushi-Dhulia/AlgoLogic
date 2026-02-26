"use client";

import { useState } from "react";

const SIZE = 5;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CircularQueue() {

  const [queue, setQueue] = useState(Array(SIZE).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");



  const isFull = () => (rear + 1) % SIZE === front;
  const isEmpty = () => front === -1;



  /* ---------- ENQUEUE ---------- */
  const enqueue = async () => {

    if (!value) return;

    if (isFull()) {

      setMessage("❌ Queue is Full");
      return;
    }

    let newFront = front;
    let newRear = rear;

    if (isEmpty()) {

      newFront = 0;
      newRear = 0;

      setMessage(`✅ "${value}" added (first element)`);

    } else {

      newRear = (rear + 1) % SIZE;

      if (newRear === 0)
        setMessage("🔁 Rear wrapped to index 0");
      else
        setMessage(`✅ "${value}" added at index ${newRear}`);
    }

    const newQueue = [...queue];
    newQueue[newRear] = value;

    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);

    setActiveIndex(newRear);

    await sleep(500);

    setActiveIndex(null);
    setValue("");
  };



  /* ---------- DEQUEUE ---------- */
  const dequeue = async () => {

    if (isEmpty()) {

      setMessage("❌ Queue is Empty");
      return;
    }

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

      setMessage("Queue is now empty");

    } else {

      newFront = (front + 1) % SIZE;

      if (newFront === 0)
        setMessage("🔁 Front wrapped to index 0");
      else
        setMessage(`Removed "${removed}"`);
    }

    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);

    setActiveIndex(null);
  };



  /* ---------- RESET ---------- */
  const reset = () => {

    setQueue(Array(SIZE).fill(null));
    setFront(-1);
    setRear(-1);
    setMessage("Queue cleared");
    setActiveIndex(null);
  };



  const currentSize =
    isEmpty()
      ? 0
      : rear >= front
      ? rear - front + 1
      : SIZE - front + rear + 1;



  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Circular Queue
      </h2>



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

        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>

      </div>



      {/* MAIN LAYOUT */}
      <div className="flex gap-8">


        {/* LEFT → VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex gap-4 flex-wrap">

          {queue.map((val, index) => {

            const isFront = index === front;
            const isRear = index === rear;

            return (

              <div key={index} className="flex flex-col items-center">

                {isFront && (
                  <span className="text-green-600 text-xs font-semibold">
                    Front
                  </span>
                )}

                <div
                  className={`
                    w-16 h-16 flex items-center justify-center border rounded-lg font-bold transition-all duration-300

                    ${activeIndex === index
                      ? "bg-red-400 text-white scale-110"
                      : val !== null
                      ? "bg-yellow-200"
                      : "bg-gray-200 opacity-40"
                    }
                  `}
                >
                  {val}
                </div>

                {isRear && (
                  <span className="text-blue-600 text-xs font-semibold mt-1">
                    Rear
                  </span>
                )}

                <span className="text-xs text-gray-400">
                  {index}
                </span>

              </div>
            );
          })}

        </div>



        {/* RIGHT → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">


          {/* STATUS */}
          <div>

            <div className="font-semibold text-gray-700">
              Status
            </div>

            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>

          </div>



          {/* INFO */}
          <div className="space-y-2 text-sm">

            <div>📊 Size: {currentSize} / {SIZE}</div>

            <div>
              Front Index: {front !== -1 ? front : "None"}
            </div>

            <div>
              Rear Index: {rear !== -1 ? rear : "None"}
            </div>

            <div>
              Is Full: {isFull() ? "Yes" : "No"}
            </div>

          </div>



          {/* LEGEND */}
          <div className="border-t pt-3 text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Filled slot</div>
            <div>⬜ Empty slot</div>
            <div>🔴 Active</div>
            <div>🟢 Front pointer</div>
            <div>🔵 Rear pointer</div>

          </div>



          {/* INFO */}
          <div className="border-t pt-3 text-sm text-gray-600 space-y-1">

            <div>• Fixed size queue</div>
            <div>• Uses modulo arithmetic</div>
            <div>• Avoids memory waste</div>
            <div>• O(1) enqueue & dequeue</div>
            <div>• Circular structure</div>

          </div>

        </div>


      </div>

    </section>

  );

}