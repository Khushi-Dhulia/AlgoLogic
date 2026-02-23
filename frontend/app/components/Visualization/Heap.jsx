"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function HeapSortVisualizer() {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);

  const addValue = () => {
    if (!input) return;
    setArray([...array, Number(input)]);
    setInput("");
  };

  const reset = () => {
    setArray([]);
    setSortedIndex([]);
  };

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
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-8">

      <h2 className="text-3xl font-bold">Heap Sort (Step-by-Step)</h2>

      {/* INPUT */}
      <div className="flex gap-4">
        <input
          type="number"
          className="border px-4 py-2 rounded-lg w-40"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
        />

        <button
          onClick={addValue}
          className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold"
        >
          Add
        </button>

        <button
          onClick={startSort}
          className="border px-6 py-2 rounded-lg"
        >
          Start Heap Sort
        </button>

        <button
          onClick={reset}
          className="border px-6 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* ARRAY VISUAL */}
      <div className="flex gap-3 flex-wrap">
        {array.map((val, index) => {
          let bg = "bg-yellow-100";

          if (sortedIndex.includes(index)) bg = "bg-green-200";
          else if (swapping.includes(index)) bg = "bg-red-300";
          else if (active.includes(index)) bg = "bg-yellow-400";

          return (
            <div
              key={index}
              className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold ${bg}`}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-gray-500">
        🟡 Comparing | 🔴 Swapping | 🟢 Sorted
      </div>

    </section>
  );
}