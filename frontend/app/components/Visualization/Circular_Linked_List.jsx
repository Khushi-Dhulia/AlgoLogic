"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CircularLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [error, setError] = useState("");

  /* ---------- INSERT END ---------- */
  const insertEnd = async () => {
    if (value === "") return;

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
    if (value === "") return;

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
    if (value === "") return;

    const index = list.indexOf(value);

    if (index === -1) {
      setError("❌ Value not found in circular list");
      return;
    }

    setError("");
    setHighlight(index);

    await sleep(500);

    const newList = list.filter((_, i) => i !== index);
    setList(newList);

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
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Circular Linked List</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border px-3 py-2 rounded-lg w-40"
        />

        <button
          onClick={insertEnd}
          className="bg-[#FFEA00] px-5 py-2 rounded-lg font-semibold"
        >
          Insert End
        </button>

        <button onClick={insertStart} className="border px-5 py-2 rounded-lg">
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

      {/* ERROR */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT — VISUALIZATION */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 min-h-[150px] flex flex-wrap items-center gap-4">
          {list.length === 0 && (
            <span className="text-gray-400 text-sm">
              Circular list is empty
            </span>
          )}

          {list.map((val, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* NODE */}
              <div
                className={`px-5 py-3 border rounded-lg font-bold transition-all
                ${
                  highlight === index
                    ? "bg-yellow-300 scale-110"
                    : "bg-yellow-100"
                }`}
              >
                {val}
              </div>

              {/* ARROW */}
              {index !== list.length - 1 && (
                <span className="text-xl font-bold">→</span>
              )}
            </div>
          ))}

          {/* CIRCULAR CONNECTION */}
          {list.length > 1 && (
            <div className="w-full mt-4 flex items-center gap-2 text-gray-600">
              <span className="text-sm">Tail connects back to Head</span>

              <span className="text-xl font-bold">⟲</span>
            </div>
          )}
        </div>

        {/* RIGHT — SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
          {/* COLOR KEY */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Normal Node
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-300 border rounded"></div>
                Active / Modified Node
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">→</span>
                Next Pointer
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">⟲</span>
                Tail connects to Head
              </div>
              <div className="flex items-center gap-2">No NULL pointer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}