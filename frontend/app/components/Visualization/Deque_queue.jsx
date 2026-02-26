"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Deque() {

  const [deque, setDeque] = useState([]);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");



  /* ---------- ADD FRONT ---------- */
  const addFront = async () => {

    if (!value) return;

    const newDeque = [value, ...deque];

    setDeque(newDeque);
    setMessage(`"${value}" inserted at Front`);

    setActiveIndex(0);
    await sleep(400);

    setActiveIndex(null);
    setValue("");
  };



  /* ---------- ADD REAR ---------- */
  const addRear = async () => {

    if (!value) return;

    const newDeque = [...deque, value];

    setDeque(newDeque);
    setMessage(`"${value}" inserted at Rear`);

    setActiveIndex(newDeque.length - 1);
    await sleep(400);

    setActiveIndex(null);
    setValue("");
  };



  /* ---------- REMOVE FRONT ---------- */
  const removeFront = async () => {

    if (deque.length === 0) {

      setMessage("❌ Deque is Empty");
      return;
    }

    setActiveIndex(0);
    setMessage("Removing element from Front");

    await sleep(400);

    const removed = deque[0];
    const newDeque = deque.slice(1);

    setDeque(newDeque);
    setActiveIndex(null);

    setMessage(`Removed "${removed}" from Front`);
  };



  /* ---------- REMOVE REAR ---------- */
  const removeRear = async () => {

    if (deque.length === 0) {

      setMessage("❌ Deque is Empty");
      return;
    }

    const lastIndex = deque.length - 1;

    setActiveIndex(lastIndex);
    setMessage("Removing element from Rear");

    await sleep(400);

    const removed = deque[lastIndex];
    const newDeque = deque.slice(0, lastIndex);

    setDeque(newDeque);
    setActiveIndex(null);

    setMessage(`Removed "${removed}" from Rear`);
  };



  /* ---------- RESET ---------- */
  const reset = () => {

    setDeque([]);
    setActiveIndex(null);
    setMessage("Deque cleared");
  };



  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Deque (Double Ended Queue)
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
          onClick={addFront}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Add Front
        </button>

        <button
          onClick={addRear}
          className="bg-yellow-300 px-5 py-2 rounded-lg font-semibold"
        >
          Add Rear
        </button>

        <button
          onClick={removeFront}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Remove Front
        </button>

        <button
          onClick={removeRear}
          className="bg-red-400 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Remove Rear
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
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex gap-4 flex-wrap items-center">

          {deque.length === 0 && (
            <div className="text-gray-400">
              Deque is empty
            </div>
          )}

          {deque.length > 0 && (
            <span className="text-green-600 font-semibold">
              Front →
            </span>
          )}

          {deque.map((item, index) => (

            <div
              key={index}
              className={`
                w-16 h-16 flex items-center justify-center rounded-lg border font-bold transition-all duration-300

                ${activeIndex === index
                  ? "bg-red-400 text-white scale-110"
                  : "bg-yellow-200"
                }
              `}
            >
              {item}
            </div>

          ))}

          {deque.length > 0 && (
            <span className="text-blue-600 font-semibold">
              ← Rear
            </span>
          )}

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

            <div>📊 Size: {deque.length}</div>

            <div>
              Front: {deque.length > 0 ? deque[0] : "None"}
            </div>

            <div>
              Rear: {deque.length > 0 ? deque[deque.length - 1] : "None"}
            </div>

            <div>⚡ Insert: O(1)</div>
            <div>⚡ Remove: O(1)</div>

          </div>



          {/* LEGEND */}
          <div className="border-t pt-3 text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Normal</div>
            <div>🔴 Active element</div>
            <div>🟢 Front side</div>
            <div>🔵 Rear side</div>

          </div>



          {/* INFO */}
          <div className="border-t pt-3 text-sm text-gray-600 space-y-1">

            <div>• Double Ended Queue</div>
            <div>• Insert at front and rear</div>
            <div>• Remove at front and rear</div>
            <div>• More flexible than Queue</div>
            <div>• Used in sliding window, scheduling</div>

          </div>


        </div>


      </div>

    </section>

  );

}