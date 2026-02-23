"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function DoublyCircularLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [error, setError] = useState("");

  /* ---------- INSERT END ---------- */
  const insertEnd = async () => {
    if (!value) return;
    setError("");

    const newList = [...list, value];
    setList(newList);

    setHighlight(newList.length - 1);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- INSERT START ---------- */
  const insertStart = async () => {
    if (!value) return;
    setError("");

    const newList = [value, ...list];
    setList(newList);

    setHighlight(0);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- DELETE ---------- */
  const deleteValue = async () => {
    if (!value) return;

    const index = list.indexOf(value);
    if (index === -1) {
      setError("❌ Value not found");
      return;
    }

    setError("");
    setHighlight(index);
    await sleep(500);

    setList(list.filter((_, i) => i !== index));
    setHighlight(null);
    setValue("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setHighlight(null);
    setError("");
  };

  return (
    <section className="bg-white m-8 p-10 rounded-2xl border shadow space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">
          Doubly Circular Linked List
        </h2>
        <p className="text-sm text-gray-500">
          Each node has prev & next • No NULL pointers
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border px-4 py-2 rounded-lg w-40"
        />

        <button
          onClick={insertEnd}
          className="bg-[#FFEA00] px-5 py-2 rounded-lg font-semibold"
        >
          Insert End
        </button>

        <button
          onClick={insertStart}
          className="border px-5 py-2 rounded-lg"
        >
          Insert Start
        </button>

        <button
          onClick={deleteValue}
          className="border px-5 py-2 rounded-lg text-red-600"
        >
          Delete
        </button>

        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* VISUALIZATION */}
      <div className="relative flex items-center gap-6 flex-wrap">

        {list.length === 0 && (
          <span className="text-gray-400">
            Doubly circular list is empty
          </span>
        )}

        {list.map((val, index) => (
          <div key={index} className="flex items-center gap-4">

            {/* NODE */}
            <div
              className={`px-5 py-3 border rounded-lg font-bold transition-all
                ${
                  highlight === index
                    ? "bg-yellow-300"
                    : "bg-yellow-100"
                }`}
            >
              <div className="text-xs text-gray-500 text-center">
                prev | data | next
              </div>
              <div className="text-center">{val}</div>
            </div>

            {/* NEXT ARROW */}
            {index !== list.length - 1 && (
              <span className="text-xl font-bold">→</span>
            )}
          </div>
        ))}

        {/* CIRCULAR LINKS */}
        {list.length > 1 && (
          <div className="w-full mt-6 text-sm text-gray-600 flex flex-col gap-1">
            <div>↩ Tail.next → Head</div>
            <div>↪ Head.prev → Tail</div>
          </div>
        )}
      </div>

      {/* LEGEND */}
      <div className="text-sm text-gray-500">
        🟡 Highlighted = active node  
        🔁 Forward & backward traversal possible  
        🚫 No NULL pointers
      </div>

    </section>
  );
}