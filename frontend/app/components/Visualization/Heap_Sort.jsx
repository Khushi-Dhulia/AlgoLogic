"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function HeapSort() {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);

  /* ---------- ADD VALUE ---------- */
  const addValue = () => {
    if (!input) return;
    setArray([...array, Number(input)]);
    setInput("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setArray([]);
    setSortedIndex([]);
    setActive([]);
    setSwapping([]);
  };

  /* ---------- HEAPIFY ---------- */
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setActive([i, left]);
      await sleep(600);

      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setActive([largest, right]);
      await sleep(600);

      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      setSwapping([i, largest]);
      await sleep(600);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);

      setSwapping([]);

      await heapify(arr, n, largest);
    }

    setActive([]);
  };

  /* ---------- START SORT ---------- */
  const startSort = async () => {
    let arr = [...array];
    const n = arr.length;

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      setSwapping([0, i]);
      await sleep(600);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);

      setSortedIndex((prev) => [...prev, i]);

      setSwapping([]);

      await heapify(arr, i, 0);
    }

    setSortedIndex((prev) => [...prev, 0]);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Heap Sort</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
          className="border px-3 py-2 rounded-lg w-40"
        />

        <button
          onClick={addValue}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Add
        </button>

        <button
          onClick={startSort}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
        Sort
        </button>

        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT — VISUALIZATION */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 min-h-[120px] flex items-center gap-3 flex-wrap">
          {array.length === 0 && (
            <div className="text-gray-400 text-sm">
              Add values to begin Heap Sort
            </div>
          )}

          {array.map((val, index) => {
            let bg = "bg-yellow-100";

            if (sortedIndex.includes(index)) bg = "bg-green-400 text-white";
            else if (swapping.includes(index)) bg = "bg-red-400 text-white";
            else if (active.includes(index)) bg = "bg-yellow-400";

            return (
              <div
                key={index}
                className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${bg}`}
              >
                {val}
              </div>
            );
          })}
        </div>

        {/* RIGHT — SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
          {/* Color Key */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color Key</h3>

            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Unsorted Element
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 border rounded"></div>
                Comparing Elements
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 border rounded"></div>
                Swapping Elements
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 border rounded"></div>
                Sorted Element
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}